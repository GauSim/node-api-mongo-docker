import config from '../config';
import * as mongoose from 'mongoose';

interface IAirPortRating {
    _id: any;
    airport_name?: string;
    link?: string;
    title?: string;
    author?: string;
    author_country?: string;
    date?: string;
    content?: string;
    experience_airport?: string;
    date_visit?: string;
    type_traveller?: string;
    overall_rating?: number;
    queuing_rating?: string;
    terminal_cleanliness_rating?: string;
    terminal_seating_rating?: string;
    terminal_signs_rating?: string;
    food_beverages_rating?: string;
    airport_shopping_rating?: string;
    wifi_connectivity_rating?: string;
    airport_staff_rating?: string
    recommended?: number
};

const AirPortRatingSchema = new mongoose.Schema({
    airport_name: String,
    link: String,
    title: String,
    author: String,
    author_country: String,
    date: String,
    content: String,
    experience_airport: String,
    date_visit: String,
    type_traveller: String,
    overall_rating: Number,
    queuing_rating: String,
    terminal_cleanliness_rating: String,
    terminal_seating_rating: String,
    terminal_signs_rating: String,
    food_beverages_rating: String,
    airport_shopping_rating: String,
    wifi_connectivity_rating: String,
    airport_staff_rating: String,
    recommended: Number
}, { collection: config.db.collection });

const AirPortRatingModel = mongoose.model<IAirPortRatingModel>('AirPortRating', AirPortRatingSchema);

interface IAirPortRatingModel extends IAirPortRating, mongoose.Document {
}


export {
IAirPortRatingModel,
AirPortRatingModel,
IAirPortRating
}
