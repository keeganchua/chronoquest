const environments = {
    development: require('./config.development'),
    production: require('./config.production'),
};

const environment = process.env.NODE_ENV || 'development';

export default environments[environment];
