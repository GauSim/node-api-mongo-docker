import * as express from 'express';
import Controller from './controller';

const ctrl = new Controller();
const rooter = express();

rooter.param('airport_name', ctrl.getAirportParamHandler);
rooter.get('/all/stats', ctrl.statsAll);
rooter.get('/:airport_name/stats', ctrl.statsFor);
rooter.get('/:airport_name/rating', ctrl.ratingsFor);
rooter.use(ctrl.noResultHandler);

export {
rooter
}