import Sequelize from 'sequelize';

import db from '../../config/database';

const TeachingNetwork = db.define('TeachingNetwork', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'RedeEnsino',
});

export default TeachingNetwork;
