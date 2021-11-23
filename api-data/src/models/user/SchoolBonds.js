import Sequelize from 'sequelize';

import db from '../../config/database';

const SchoolBonds = db.define('SchoolBonds', {
  id: {
    primaryKey: true,
    type: Sequelize.TINYINT,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'VinculoEscolar',
});

export default SchoolBonds;
