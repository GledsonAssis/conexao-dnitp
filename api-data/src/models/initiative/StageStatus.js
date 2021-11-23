import Sequelize from 'sequelize';

import db from '../../config/database';

const StageStatus = db.define('StageStatus', {
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
  tableName: 'IniciativaTramiteStatus',
});

export default StageStatus;
