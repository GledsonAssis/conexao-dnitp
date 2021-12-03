import Sequelize from 'sequelize';
import db from '../../config/database';

import Action from '../action/Action'
import Course from '../course/Course';
import Activity from '../activity/Activity';
import Project from '../project/Project';
import ExternalLink from '../ExternalLink/ExternalLink';
import ProjectAction from '../projectAction/ProjectAction';

const Highlight = db.define('HighlightItem', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  position: {
    field: 'ordem',
    type: Sequelize.SMALLINT,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'MuralItem',
});


const HighlightItem = db.define('HighlightItem', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(500),
  },
  typeId: {
    field: 'identificadorTipo',
    type: Sequelize.STRING(3),
  },
  type: {
    field: 'tipo',
    type: Sequelize.STRING(500),
  },
  highlighted: {
    field: 'destaque',
    type: Sequelize.BOOLEAN,
  },
  position: {
    field: 'ordem',
    type: Sequelize.SMALLINT,
  },
  creationDate: {
    field: 'dataCriacao',
    type: Sequelize.DATEONLY,
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'vw_listagem_controleMural',
});

const HighlightMural = db.define('HighlightMural', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.SMALLINT,
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(500),
  },
  summary: {
    field: 'resumo',
    type: Sequelize.STRING(1000),
  },
  date: {
    field: 'data',
    type: Sequelize.DATE,
  },
  type: {
    field: 'tipo',
    type: Sequelize.STRING(50),
  },
  position: {
    field: 'ordem',
    type: Sequelize.SMALLINT,
  },
  imageId: {
    field: 'imagemId',
    type: Sequelize.INTEGER(),
  },
  imageName: {
    field: 'imagemNome',
    type: Sequelize.STRING(500),
  },
  extra: {
    field: 'extra',
    type: Sequelize.STRING(2000),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'vw_listagem_mural',
});

HighlightItem.belongsTo(Action, {
  as: 'Acao',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

HighlightItem.belongsTo(Course, {
  as: 'Capacitacao',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

HighlightItem.belongsTo(Activity, {
  as: 'Atividade',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

HighlightItem.belongsTo(Project, {
  as: 'Projeto',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

HighlightItem.belongsTo(ExternalLink, {
  as: 'LinkExterno',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

HighlightItem.belongsTo(ProjectAction, {
  as: 'ProjetoAcao',
  foreignKey: {
    field: 'id',
  },
  targetKey: 'id',
});

export {
  Highlight,
  HighlightMural,
};

export default HighlightItem;
