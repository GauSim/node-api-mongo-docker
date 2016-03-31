// import { connect, disconnect } from './database';
import { AirPortRatingService } from '../service';
import AirportRatingController from '../controller';
import * as _ from 'underscore';


const ctrl = new AirportRatingController();
const service = new AirPortRatingService();

const expressHandlerToPromise = (func, req = {}) => new Promise((ok, fail) => func(req, { json: ok, end: ok, send: ok }, fail));
const speedOf = <T>(name: string, work: (bitbucket?) => Promise<T> | PromiseLike<T>, log: boolean = false) => {
    name = `speedOf ${name}`;
    console.time(name);
    return work()
        .then(data => (console.timeEnd(name), log ? (console.log(data), data) : data))
        .then(null, error => (console.timeEnd(name), console.error(error), error));
}

const performaceTest = () => Promise.resolve(null)

    // .then(_ => speedOf('connectDB', _ => connect()))
    // .then(_ => speedOf('disconnectDB', _ => disconnect()));

    .then(_ => speedOf('statsAll', _ => expressHandlerToPromise(ctrl.statsAll)))

    .then(_ => speedOf('listAirportNames', _ => service.listAirportNames()))

    .then(_.sample) // get random airport from list

    .then((randomAirport: string) => Promise.all([

        speedOf(`statsFor (${randomAirport})`, _ => expressHandlerToPromise(ctrl.statsFor, { airport_name: randomAirport })),
        speedOf(`ratingsFor (${randomAirport})`, _ => expressHandlerToPromise(ctrl.ratingsFor, { airport_name: randomAirport }))

    ]));



export default () => speedOf('performaceTest', performaceTest);
