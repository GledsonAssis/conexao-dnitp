import Sequelize from 'sequelize';
import db from '../../config/database';

const QuestionType = db.define('QuestionType', {
  id: {
    autoincrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(255),
  },
  active: {
    field: 'ativo',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeAvaliacaoPerguntaTipo',
});

export default QuestionType;
