import Sequelize from 'sequelize';

// Override timezone formatting
// Bug: https://github.com/sequelize/sequelize/issues/7930
// eslint-disable-next-line no-underscore-dangle
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  let newDate = date;
  // eslint-disable-next-line no-underscore-dangle
  newDate = this._applyTimezone(date, options);
  return newDate.format('YYYY-MM-DD HH:mm:ss.SSS');
};

//DB CONNECTION
var db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
  {
    logging: console.log,
    define: {
      timestamps: false, // true by default
    },
    // timestamps: false,
    host: process.env.DB_SERVER,
    port: +process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      encrypt: false,
      requestTimeout: 1800000,
      timeout: 1800000,
    },
    // operatorsAliases: false,
    sync: true,
    pool: {
      acquire: 10000,
      evict: 60000,
      handleDisconnects: true,
      idle: 10000,
      max: 10,
      min: 0,
    },
  }
);

// const db = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
//   {
//     logging: true,
//     define: {
//       timestamps: false, // true by default
//     },
//     dialect: 'mssql',
//     dialectOptions: {
//       encrypt: false,
//       instanceName: process.env.DB_INSTANCE,
//       requestTimeout: 1800000,
//       timeout: 1800000,
//     },
//     host: process.env.DB_SERVER,
//     pool: {
//       acquire: 10000,
//       evict: 60000,
//       handleDisconnects: true,
//       idle: 10000,
//       max: 10,
//       min: 0,
//     },
//     port: process.env.DB_PORT,
//   },
// );

export default db;
