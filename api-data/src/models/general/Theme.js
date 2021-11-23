import Sequelize from 'sequelize';

import db from '../../config/database';

const Theme = db.define('Theme', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeTema',
});

export default Theme;
