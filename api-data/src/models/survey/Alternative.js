import Sequelize from 'sequelize';
import db from '../../config/database';
import Question from './Question';

const Alternative = db.define('Alternative', {
  id: {
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idQuestion: {
    allowNull: false,
    field: 'idAtividadeAvaliacaoPergunta',
    references: {
      key: 'id',
      model: Question,
    },
    type: Sequelize.INTEGER,
  },
  option: {
    field: 'descricao',
    type: Sequelize.STRING(855),
  },
  is_justify: {
    field: 'justificar',
    type: Sequelize.BOOLEAN,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeAvaliacaoPerguntaAlternativa',
});

Question.hasMany(Alternative, {
  as: 'alternatives',
  foreignKey: {
    field: 'idAtividadeAvaliacaoPergunta',
  },
  targetKey: 'id',
});


export default Alternative;
