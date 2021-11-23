import Sequelize, { DataTypes } from 'sequelize';

import db from '../../config/database';

import MessageType from './Type';
import MessageStatus from './Status';
import User from '../user/User';

const Message = db.define('Message', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idUserFrom: {
    field: 'idUsuarioOrigem',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  idUserRecipient: {
    field: 'idUsuarioDestino',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  idMessageType: {
    field: 'idMensagemTipo',
    references: {
      key: 'id',
      model: MessageType,
    },
    type: Sequelize.TINYINT,
  },
  idParentMessage: {
    field: 'idMensagemAgrupada',
    references: {
      key: 'id',
      model: this,
    },
    type: Sequelize.TINYINT,
  },
  dateTimeLastResponse: {
    field: 'dataHoraUltimaResposta',
    defaultValue: DataTypes.NOW,
    type: Sequelize.DATE,
  },
  subject: {
    field: 'assunto',
    type: Sequelize.STRING(150),
  },
  idStatus: {
    field: 'idStatus',
    references: {
      key: 'id',
      model: MessageStatus,
    },
    type: Sequelize.INTEGER,
  },
  originDeleted: {
    field: 'removidoOrigem',
    type: Sequelize.BOOLEAN,
  },
  destinationDeleted: {
    field: 'removidoDestino',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Mensagem',
});

Message.belongsTo(User, {
  as: 'from',
  foreignKey: {
    field: 'idUsuarioOrigem',
  },
  targetKey: 'id',
});

Message.belongsTo(User, {
  as: 'recipient',
  foreignKey: {
    field: 'idUsuarioDestino',
  },
  targetKey: 'id',
});

Message.belongsTo(MessageType, {
  as: 'type',
  foreignKey: {
    field: 'idMensagemTipo',
  },
  targetKey: 'id',
});

Message.belongsTo(MessageStatus, {
  as: 'status',
  foreignKey: {
    field: 'idStatus',
  },
  targetKey: 'id',
});

export default Message;
