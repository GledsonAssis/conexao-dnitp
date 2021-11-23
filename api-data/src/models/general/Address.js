import Sequelize from 'sequelize';

import db from '../../config/database';

import City from './City';

const Address = db.define('Address', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  idCity: {
    field: 'idMunicipio',
    references: {
      key: 'id',
      model: City,
    },
    type: Sequelize.TINYINT,
  },
  cep: {
    field: 'cep',
    type: Sequelize.CHAR(8),
  },
  complement: {
    field: 'complemento',
    type: Sequelize.CHAR(50),
  },
  district: {
    field: 'bairro',
    type: Sequelize.CHAR(50),
  },
  number: {
    field: 'numero',
    type: Sequelize.CHAR(50),
  },
  street: {
    field: 'logradouro',
    type: Sequelize.STRING(150),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Endereco',
});

Address.belongsTo(City, {
  as: 'city',
  foreignKey: {
    field: 'idMunicipio',
  },
  targetKey: 'id',
});

export default Address;
