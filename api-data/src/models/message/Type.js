import Sequelize from 'sequelize';

import db from '../../config/database';

import Roles from '../user/Roles';

const Type = db.define('Type', {
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
  tableName: 'MensagemTipo',
});

Type.belongsToMany(Roles, {
  foreignKey: 'idMensagemTipo',
  through: 'PerfilMensagemTipo',
});

Roles.belongsToMany(Type, {
  foreignKey: 'idPerfil',
  through: 'PerfilMensagemTipo',
});

export default Type;
