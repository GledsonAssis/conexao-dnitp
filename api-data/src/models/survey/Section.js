import Sequelize from 'sequelize';
import db from '../../config/database';
import Survey from './Survey';

const Section = db.define('Section', {
  id: {
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  idSurvey: {
    allowNull: false,
    field: 'idAtividadeAvaliacao',
    references: {
      key: 'id',
      model: Survey,
    },
    type: Sequelize.INTEGER,
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
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'AtividadeAvaliacaoSecao',
});

Survey.hasMany(Section, {
  as: 'sections',
  foreignKey: {
    field: 'idAtividadeAvaliacao',
  },
  targetKey: 'id',
});


export default Section;
