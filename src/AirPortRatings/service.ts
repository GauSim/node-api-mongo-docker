import * as mongoose from 'mongoose';
import config from '../config';
import { AirPortRatingModel, IAirPortRatingModel, IAirPortRating } from './model';

export const QUERY = {
    joinOnAirportName: { _id: "$airport_name" },
    countReviews: { count: { $sum: 1 } },
    countRecommended: { recommended: { $sum: '$recommended' } },
    avgOverallRating: { overall_rating_avg: { $avg: '$overall_rating' } },
    includeRefItems: { ref: { $push: '$$ROOT' } },
    sortByDate: { date: 1 },
    sortById: { _id: 1 }
}

export class AirPortRatingService {

    private _model: mongoose.Model<IAirPortRatingModel> = null;

    constructor(model = AirPortRatingModel) {
        this._model = model;
    }

    public aggregateRating = ($match: IAirPortRating | {}, groups: { [key: string]: any }[] = []) => {

        // always joinOnAirportName
        let $group = QUERY.joinOnAirportName;

        // mixin param groups
        $group = (<{ assign(target: any, ...sources: any[]): any; }>(<any>Object)).assign($group, ...groups);

        return this._model
            .aggregate([
                { $match: $match },
                { $group: $group },
                { $sort: QUERY.sortById } // always sort by _id
            ])
            .exec();
    }

    public countAll = (query: IAirPortRating | {} = {}) => {
        return this._model
            .count(query)
            .exec();
    }

    public listAirportNames = (query: IAirPortRating | {} = {}) => {
        return this._model
            .distinct('airport_name', query)
            .exec();
    }

    public findRating = (query: IAirPortRating | {} = {}, sorter: {} = QUERY.sortById) => {
        return this._model
            .find(query)
            .sort(sorter)
            .exec();
    }
}
