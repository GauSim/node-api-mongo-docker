import * as mongoose from 'mongoose';
import config from './config';
import { EventEmitter } from 'events';

let _force = false;

function _reconnect(): EventEmitter {
    const options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db.getURI(), options).connection;
}

export function disconnect() {
    _force = true;
    return new Promise((ok, fail) => {
        mongoose.disconnect((e => {
            if (e) {
                fail(e);
            } else {
                ok(true);
            }
        }));
    });
}

export function connect() {
    return new Promise((ok, fail) => {
        _reconnect()
            .on('disconnected', reason => !_force ? _reconnect() : void (0)) // will auto-reconnect if not forced
            .once('error', fail)
            .once('open', ok);
    });
}
