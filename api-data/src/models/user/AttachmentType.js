import Sequelize from 'sequelize';

import db from '../../config/database';

const AttachmentType = db.define('AttachmentType', {
  id: {
    autoIncrement: true,
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(50),
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'UsuarioAnexoTipo',
});

export default AttachmentType;
