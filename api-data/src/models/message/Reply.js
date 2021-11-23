import Sequelize, { DataTypes } from 'sequelize';

import db from '../../config/database';

import Message from './Message';
import User from '../user/User';

const Reply = db.define('Reply', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idMessage: {
    field: 'idMensagem',
    references: {
      key: 'id',
      model: Message,
    },
    type: Sequelize.TINYINT,
  },
  idUser: {
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  dateTime: {
    field: 'dataHora',
    defaultValue: DataTypes.NOW,
    type: Sequelize.DATE,
  },
  text: {
    field: 'texto',
    type: Sequelize.STRING(1000),
  },
  read: {
    field: 'lido',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'MensagemResposta',
});

Message.hasMany(Reply, {
  as: 'reply',
  foreignKey: {
    field: 'idMensagem',
  },
  sourceKey: 'id',
});

Message.hasMany(Reply, {
  as: 'replyFromUser',
  foreignKey: {
    field: 'idMensagem',
  },
  sourceKey: 'id',
});

Reply.belongsTo(User, {
  as: 'replyFrom',
  foreignKey: {
    field: 'idUsuario',
  },
});

export default Reply;
