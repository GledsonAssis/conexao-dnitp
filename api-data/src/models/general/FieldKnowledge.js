import Sequelize from 'sequelize';

import db from '../../config/database';

const FieldKnowledge = db.define('FieldKnowledge', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  description: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AreaConhecimento',
});

export default FieldKnowledge;
