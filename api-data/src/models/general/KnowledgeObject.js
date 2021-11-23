import Sequelize from 'sequelize';

import db from '../../config/database';

import Discipline from './Discipline';
import SchoolYear from './SchoolYear';
import Activity from '../activity/Activity';

const ActivityKnowledgeObject = db.define('ActivityKnowledgeObject', {
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Discipline,
    },
    type: Sequelize.INTEGER,
  },
  idKnowledgeObject: {
    field: 'idAnoDisciplinaConteudo',
    references: {
      key: 'id',
      model: Discipline,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeConteudo',
});

const KnowledgeObject = db.define('KnowledgeObject', {
  id: {
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'texto',
    type: Sequelize.STRING(500),
  },
  idDiscipline: {
    field: 'idDisciplinaEscolar',
    references: {
      key: 'id',
      model: Discipline,
    },
    type: Sequelize.INTEGER,
  },
  idSchoolYear: {
    field: 'idAnoEscolar',
    references: {
      key: 'id',
      model: SchoolYear,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AnoEscolarDisciplinaEscolarConteudo',
});

KnowledgeObject.belongsTo(Discipline, {
  as: 'discipline',
  foreignKey: {
    field: 'idDisciplinaEscolar',
  },
  model: Discipline,
  sourceKey: 'id',
});

Discipline.belongsToMany(KnowledgeObject, {
  as: 'disciplineContent',
  foreignKey: {
    field: 'idDisciplinaEscolar',
  },
  sourceKey: 'idDisciplinaEscolar',
  through: 'AnoEscolarDisciplinaEscolar',
});

KnowledgeObject.belongsToMany(SchoolYear, {
  as: 'schoolYear',
  foreignKey: {
    field: 'idAnoEscolar',
  },
  sourceKey: 'idAnoEscolar',
  through: 'AnoEscolarDisciplinaEscolar',
});

SchoolYear.belongsToMany(KnowledgeObject, {
  as: 'disciplineContent',
  foreignKey: {
    field: 'idAnoEscolar',
  },
  sourceKey: 'idAnoEscolar',
  through: 'AnoEscolarDisciplinaEscolar',
});

Activity.belongsToMany(KnowledgeObject, {
  as: 'knowledgeObject',
  foreignKey: 'idAtividade',
  through: 'AtividadeConteudo',
});

KnowledgeObject.belongsToMany(Activity, {
  as: 'activity',
  foreignKey: 'idAnoDisciplinaConteudo',
  through: 'AtividadeConteudo',
});

export {
  ActivityKnowledgeObject,
};

export default KnowledgeObject;
