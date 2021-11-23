import Sequelize from 'sequelize';

import db from '../../config/database';

import State from './State';

const City = db.define('City', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  ibgeCode: {
    field: 'codigoIbge',
    type: Sequelize.INTEGER,
  },
  idState: {
    field: 'idUnidadeFederativa',
    references: {
      key: 'id',
      model: State,
    },
    type: Sequelize.TINYINT,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'sistema',
  tableName: 'Municipio',
});

City.belongsTo(State, {
  as: 'state',
  foreignKey: {
    field: 'idUnidadeFederativa',
  },
  targetKey: 'id',
});

export default City;
