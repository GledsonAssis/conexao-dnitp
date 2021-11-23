import Sequelize from 'sequelize';
import db from '../../config/database';

const Survey = db.define('Survey', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    type: Sequelize.INTEGER,
  },
  version: {
    field: 'versao',
    type: Sequelize.TINYINT,
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(255),
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(3000),
  },
  active: {
    field: 'ativo',
    type: Sequelize.BOOLEAN,
  },
  date: {
      field: 'dataCadastro',
      type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeAvaliacao',
});

export default Survey;
