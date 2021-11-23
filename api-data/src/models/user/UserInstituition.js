import Sequelize from 'sequelize';
import db from '../../config/database';

const UserInstituition = db.define('UserInstituition', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    type: Sequelize.SMALLINT,
  },
  idInstituition: {
    field: 'idInstituicaoEnsino',
    type: Sequelize.SMALLINT,
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'UsuarioInstituicaoEnsino',
});

export default UserInstituition;
