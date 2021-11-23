import Sequelize from 'sequelize';
import db from '../../config/database';
import User from './User';

const Phone = db.define('Phone', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.INTEGER,
  },
  idPhoneType: {
    field: 'idTelefoneTipo',
    type: Sequelize.INTEGER,
  },
  DDD: {
    field: 'codigoDiscagemDiretaDistancia',
    type: Sequelize.INTEGER,
  },
  number: {
    field: 'numero',
    type: Sequelize.INTEGER,
  },
}, {
  freezeTableName: true,
  schema: 'seguranca',
  tableName: 'UsuarioTelefone',
});

User.hasMany(Phone, {
  as: 'phones',
  foreignKey: {
    field: 'idUsuario',
  },
  targetKey: 'id',
});

export default Phone;
