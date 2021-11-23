import Sequelize from 'sequelize';

import db from '../../config/database';

import TrafficConcept from './TrafficConcept';
import Activity from '../activity/Activity';

const TrafficContent = db.define('TrafficContent', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idTransitConcept: {
    field: 'idTransitoConceito',
    references: {
      key: 'id',
      model: TrafficConcept,
    },
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'texto',
    type: Sequelize.STRING(255),
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'TransitoConteudo',
});

TrafficConcept.hasMany(TrafficContent, {
  as: 'trafficContent',
  foreignKey: {
    field: 'idTransitoConceito',
  },
  sourceKey: 'id',
});

TrafficContent.belongsTo(TrafficConcept, {
  as: 'trafficConcept',
  foreignKey: {
    field: 'idTransitoConceito',
  },
  targetKey: 'id',
});

const ActivityTrafficContent = db.define('ActivityTrafficContent', {
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idTrafficContent: {
    field: 'idTransitoConteudo',
    references: {
      key: 'id',
      model: TrafficContent,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeTransitoConteudo',
});

Activity.belongsToMany(TrafficContent, {
  as: 'trafficContent',
  foreignKey: 'idAtividade',
  through: 'AtividadeTransitoConteudo',
});

TrafficContent.belongsToMany(Activity, {
  as: 'activities',
  foreignKey: 'idTransitoConteudo',
  through: 'AtividadeTransitoConteudo',
});

export {
  ActivityTrafficContent,
};

export default TrafficContent;
