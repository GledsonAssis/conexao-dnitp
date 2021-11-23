import Sequelize from 'sequelize';

import db from '../../config/database';


import Discipline from '../general/Discipline';
import Initiative from '../initiative/Initiative';
import TrafficConcept from '../general/TrafficConcept';

const Activity = db.define('Activity', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  idConcept: {
    field: 'idTransitoConceito',
    references: {
      key: 'id',
      model: TrafficConcept,
    },
    type: Sequelize.INTEGER,
  },
  idDiscipline: {
    field: 'idDisciplinaPrincipal',
    references: {
      key: 'id',
      model: Discipline,
    },
    type: Sequelize.INTEGER,
  },
  idInitiative: {
    field: 'idIniciativa',
    references: {
      key: 'id',
      model: Initiative,
    },
    type: Sequelize.INTEGER,
  },
  code: {
    field: 'codigo',
    type: Sequelize.STRING(15),
  },
  date: {
    field: 'dataPublicacao',
    type: Sequelize.DATE,
  },
  excludedDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  duration: {
    field: 'tempoDuracao',
    type: Sequelize.STRING(50),
  },
  evaluation: {
    field: 'avaliacao',
    type: Sequelize.STRING(2000),
  },
  isPublished: {
    field: 'publicado',
    type: Sequelize.BOOLEAN,
  },
  otherConnections: {
    field: 'conteudoInterdiciplinaridade',
    type: Sequelize.STRING(855),
  },
  reference: {
    field: 'referencia',
    type: Sequelize.STRING(255),
  },
  resource: {
    field: 'recursoNecessario',
    type: Sequelize.STRING(855),
  },
  teachingGuide: {
    field: 'orientacaoProfessor',
    type: Sequelize.STRING(855),
  },
  teachingArticulation: {
    field: 'articulacaoDidatica',
    type: Sequelize.STRING(855),
  },
  title: {
    field: 'tituloAtividade',
    type: Sequelize.STRING(255),
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Atividade',
});

Activity.belongsTo(TrafficConcept, {
  as: 'trafficConcept',
  foreignKey: {
    field: 'idTransitoConceito',
  },
  targetKey: 'id',
});

Activity.belongsTo(Discipline, {
  as: 'discipline',
  foreignKey: {
    field: 'idDisciplinaPrincipal',
  },
  targetKey: 'id',
});

Activity.belongsTo(Initiative, {
  as: 'initiative',
  foreignKey: {
    field: 'idIniciativa',
  },
  targetKey: 'id',
});

export default Activity;
