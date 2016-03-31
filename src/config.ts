class Config {

    db: {
        getURI: () => string;
        collection: string;
        host: string;
        name: string;
    }

    server: {
        port: number;
    }

    constructor() {
        this.db = {
            name: 'test',
            host: '192.168.99.100:32768', // 'docker:32768';
            collection: 'importtest1',
            getURI: () => `mongodb://${this.db.host}/${this.db.name}`,
        };
        this.server = {
            port: 1337
        }
    }
}

export default new Config();
