import * as express from 'express';
import { rooter as airportAPIRouter } from './AirportRatings/router';

const poorMansErrorLogging = (error: Error, req, res, next) => (console.error(error.stack), next(error));
const noResourceFound = (error: Error, req, res, next) => (error ? res.status(500).send('500') : res.status(404).send('404'));

function startServer() {
    return express()
        .use('/api', airportAPIRouter)
        .use(poorMansErrorLogging)
        .use(noResourceFound);
}

export { startServer }
