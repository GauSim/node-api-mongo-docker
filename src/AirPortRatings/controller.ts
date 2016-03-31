import * as express from 'express';
import { AirPortRatingService, QUERY } from './service';

interface ApiRequest extends express.Request {
    airport_name?: string
}

interface IAirPortAPIRouteHandler {
    (req: ApiRequest, res: express.Response, next: express.NextFunction): void;
}

const ERROR = {
    NoResult: new Error('NoResult'),
    NoAirportIdFound: new Error('NoAirportIdFound')
};

export default class AirportRatingController {

    private _service: AirPortRatingService = null;

    private _getFirstOrDefault = <T>(resultSet: T[]) => resultSet ? resultSet[0] : null;

    private _throwOnNoResultSet = (resultSet) => {
        if (!resultSet) throw ERROR.NoResult;
        return resultSet;
    };

    private _needAirportId = (wraped: IAirPortAPIRouteHandler) => {
        return (request, response, next) => {
            if (!request.airport_name) {
                throw ERROR.NoAirportIdFound;
            };
            return wraped(request, response, next);
        }
    };

    constructor() {
        this._service = new AirPortRatingService();
    }

    public noResultHandler = (error: Error, req, res, next) => (error === ERROR.NoResult ? next() : next(error));

    public getAirportParamHandler = (request, res, next, airport_name: string) => {
        request.airport_name = airport_name ? airport_name : null;
        next();
    };

    public statsFor: IAirPortAPIRouteHandler = this._needAirportId((request, response, next) => {

        this._service
            .aggregateRating({ airport_name: request.airport_name }, [QUERY.countReviews, QUERY.countRecommended, QUERY.avgOverallRating])
            .then(this._getFirstOrDefault)
            .then(this._throwOnNoResultSet)
            .then(null, next)
            .then(data => response.json(data));

    });

    public ratingsFor: IAirPortAPIRouteHandler = this._needAirportId((request, response, next) => {

        this._service
            .findRating({ airport_name: request.airport_name }, QUERY.sortByDate)
            .then(this._throwOnNoResultSet)
            .then(null, next)
            .then(data => response.json(data));
    });

    public statsAll: IAirPortAPIRouteHandler = (request, response, next) => {

        this._service
            .aggregateRating({}, [QUERY.countReviews])
            .then(this._throwOnNoResultSet)
            .then(null, next)
            .then(data => response.json(data));
    };

}
