import Sequelize from 'sequelize';
import db from '../../config/database';
import Section from './Section';
import QuestionType from './QuestionType';


const Question = db.define('Question', {
  id: {
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idSection: {
    allowNull: false,
    field: 'idAtividadeAvaliacaoSecao',
    references: {
      key: 'id',
      model: Section,
    },
    type: Sequelize.INTEGER,
  },
  type: {
    allowNull: false,
    field: 'idAtividadeAvaliacaoPerguntaTipo',
    references: {
      key: 'id',
      model: QuestionType,
    },
    type: Sequelize.INTEGER,
  },
  question: {
    field: 'pergunta',
    type: Sequelize.STRING(855),
  },
  required: {
    field: 'obrigatoria',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeAvaliacaoPergunta',
});

Section.hasMany(Question, {
  as: 'questions',
  foreignKey: {
    field: 'idAtividadeAvaliacaoSecao',
  },
  targetKey: 'id',
});

Question.belongsTo(QuestionType, {
  as: 'types',
  foreignKey: {
    field: 'idAtividadeAvaliacaoPerguntaTipo',
  },
  targetKey: 'id',
});


export default Question;
