import Sequelize from 'sequelize';

import db from '../../config/database';

const FileType = db.define('FileType', {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'TipoArquivo',
});

export default FileType;
