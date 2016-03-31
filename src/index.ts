import performaceTest from './AirPortRatings/tests/performaceTest';
import config from './config';
import { startServer } from './server';
import { connect } from './database';


// docker run -it --rm -p 8081:8081 --link mongo:mongo mongo-express
// docker cp airport.csv mongo:airport.csv
// mongoimport --db test --collection importtest1 --type csv --file airport.csv --headerline


// start the server 
connect()
    // .then(_ => performaceTest())
    .then(isConnected => startServer().listen(config.server.port, () => {

        console.log('server up:');

        console.log(`
        http://localhost:${config.server.port}/api/all/stats
        http://localhost:${config.server.port}/api/london-heathrow-airport/stats
        http://localhost:${config.server.port}/api/london-heathrow-airport/rating
        `);

    }))


