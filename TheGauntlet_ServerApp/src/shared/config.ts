export const Config = {
    serviceSettings: {
        logsDir: "logs/",
        env: process.env.environment || "local"
    },
    //TODO: change me
    apiSettings: {
        port: process.env.API_PORT || 4895,
        corsWhitelist: [
            'http://localhost'
        ],
        baseApiUri: "/api/v1",
        healthCheck: "/hc",
    },
    dbSettings: {
        connectionString: process.env.MONGO_DB_HOST || 'mongodb://localhost:27017',
        database: 'statesDB',
        replicaSet: 'rs0'
    }
};