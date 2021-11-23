import Sequelize from 'sequelize';

import db from '../../config/database';

const Roles = db.define('Roles', {
  id: {
    autoIncrement: true,
    type: Sequelize.SMALLINT,
    primaryKey: true,
  },
  name: {
    field: 'nome',
    type: Sequelize.STRING(100),
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'Perfil',
});

export default Roles;
