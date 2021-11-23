import Sequelize from 'sequelize';

import db from '../../config/database';

const Mime = db.define('Mime', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  suffix: {
    field: 'sufixo',
    type: Sequelize.STRING(10),
  },
  media: {
    field: 'media',
    type: Sequelize.STRING(100),
  },
}, {
  freezeTableName: true,
  schema: 'sistema',
  tableName: 'Mime',
});

export default Mime;
