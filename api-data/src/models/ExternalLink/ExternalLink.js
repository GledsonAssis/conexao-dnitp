import Sequelize from 'sequelize';

import db from '../../config/database';

const ExternalLink = db.define('ExternalLink', {
  id: {
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(),
  },
  isPublished: {
    field: 'publicado',
    type: Sequelize.BOOLEAN,
  },
  excludedDate: {
    defaultValue: Sequelize.NOW,
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  date: {
    field: 'data',
    type: Sequelize.DATEONLY,
  },
  link: {
    field: 'link',
    type: Sequelize.STRING(100),
  },
  summary: {
    field: 'resumo',
    type: Sequelize.STRING(200),
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(100),
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
},
{
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'LinkExterno',
});

export default ExternalLink;
