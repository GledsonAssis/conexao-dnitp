import Sequelize from 'sequelize';

import db from '../../config/database';
import Activity from '../activity/Activity';
import DnitUnit from '../dnitUnit/DnitUnit';
import User from '../user/User';
import Question from './Question';
import Alternative from './Alternative';
import UserEvaluation from './UserEvaluation';

const UserEvaluationAnswer = db.define('UserEvaluationAnswer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
    type: Sequelize.INTEGER,
  },
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idUser: {
    field: 'idUsuario',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.TINYINT,
  },
  idDnitUnit: {
    field: 'idUnidadeDnit',
    references: {
      key: 'id',
      model: DnitUnit,
    },
    type: Sequelize.TINYINT,
  },
  idQuestion: {
    field: 'idAtividadeAvaliacaoPergunta',
    references: {
      key: 'id',
      model: Question,
    },
    type: Sequelize.TINYINT,
  },
  idAlternative: {
    field: 'idAtividadeAvaliacaoAlternativa',
    references: {
      key: 'id',
      model: Alternative,
    },
    type: Sequelize.TINYINT,
  },
  idEvaluation: {
    field: 'idAtividadeUsuarioAvaliacao',
    references: {
      key: 'id',
      model: UserEvaluation,
    },
    type: Sequelize.INTEGER,
  },
  answer: {
    field: 'justificativa',
    type: Sequelize.STRING(4000),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeUsuarioAvaliacaoResposta',
});

UserEvaluationAnswer.belongsTo(Activity, {
  as: 'activity',
  foreignKey: {
    field: 'idAtividade',
  },
  sourceKey: 'id',
});

UserEvaluationAnswer.belongsTo(User, {
  as: 'user',
  foreignKey: {
    field: 'idUsuario',
  },
  sourceKey: 'id',
});

UserEvaluationAnswer.belongsTo(DnitUnit, {
  as: 'dnitUnit',
  foreignKey: {
    field: 'idUnidadeDnit',
  },
  sourceKey: 'id',
});

Question.belongsTo(UserEvaluationAnswer, {
  as: 'user',
  foreignKey: {
    field: 'id',
  },
  sourceKey: 'idAtividadeAvaliacaoPergunta',
});

Alternative.belongsTo(UserEvaluationAnswer, {
  as: 'user',
  foreignKey: {
    field: 'id',
  },
  sourceKey: 'idAtividadeAvaliacaoAlternativa',
});
export default UserEvaluationAnswer;
