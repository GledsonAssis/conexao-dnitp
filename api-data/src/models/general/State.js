import Sequelize from 'sequelize';

import db from '../../config/database';

const State = db.define('State', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  code: {
    field: 'codigo',
    type: Sequelize.TINYINT,
  },
  initials: {
    field: 'sigla',
    type: Sequelize.CHAR(2),
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'sistema',
  tableName: 'UnidadeFederativa',
});

export default State;
