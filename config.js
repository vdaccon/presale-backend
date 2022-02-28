require('dotenv').config();

// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DBURL = `mongodb+srv://<rupendra>:<password>@dgtlz-finance.a7tbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = 'rupendra';
const DB_PASSWORD = 'IkkH7v2q59nNQha6';
const jwtSecret = JWTSECRET;
const mongodburi = 'mongodb+srv://' + DB_USERNAME + ':' + DB_PASSWORD + '@dgtlz-finance.a7tbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
module.exports = {jwtSecret,mongodburi};
