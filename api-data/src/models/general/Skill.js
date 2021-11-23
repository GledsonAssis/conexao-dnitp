import Sequelize from 'sequelize';

import db from '../../config/database';

import Activity from '../activity/Activity';
import TrafficScope from './TrafficScope';


const Skill = db.define('Skill', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idTransitCompetence: {
    field: 'idTransitoCompetencia',
    references: {
      key: 'id',
      model: TrafficScope,
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
  tableName: 'TransitoHabilidade',
});

TrafficScope.hasMany(Skill, {
  as: 'skills',
  foreignKey: {
    field: 'idTransitoCompetencia',
  },
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

Skill.belongsTo(TrafficScope, {
  as: 'trafficScope',
  foreignKey: {
    field: 'idTransitoCompetencia',
  },
  targetKey: 'id',
  onDelete: 'CASCADE',
});

const ActivitySkill = db.define('ActivityTrafficScopeSkill', {
  idActivity: {
    field: 'idAtividade',
    references: {
      key: 'id',
      model: Activity,
    },
    type: Sequelize.INTEGER,
  },
  idSkill: {
    field: 'idTransitoHabilidade',
    references: {
      key: 'id',
      model: Skill,
    },
    type: Sequelize.INTEGER,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeTransitoHabilidade',
});

Activity.belongsToMany(Skill, {
  as: 'skills',
  foreignKey: 'idAtividade',
  through: 'AtividadeTransitoHabilidade',
});

Skill.belongsToMany(Activity, {
  as: 'activities',
  foreignKey: 'idTransitoHabilidade',
  through: 'AtividadeTransitoHabilidade',
});


export {
  ActivitySkill,
};

export default Skill;
