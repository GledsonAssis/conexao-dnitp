import Sequelize from 'sequelize';

import db from '../../config/database';

const Status = db.define('Status', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'MensagemStatus',
});

export default Status;
