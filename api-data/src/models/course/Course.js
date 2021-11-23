import Sequelize from 'sequelize';

import db from '../../config/database';
import User from '../user/User';

const Course = db.define('Course', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idUser: {
    field: 'idUsuarioLog',
    references: {
      key: 'id',
      model: User,
    },
    type: Sequelize.INTEGER,
  },
  date: {
    field: 'data',
    type: Sequelize.DATEONLY,
  },
  description: {
    field: 'descricao',
    type: Sequelize.STRING(),
  },
  endDate: {
    field: 'dataFim',
    type: Sequelize.DATE,
  },
  excludedDate: {
    field: 'dataExclusao',
    type: Sequelize.DATE,
  },
  isCover: {
    field: 'capa',
    type: Sequelize.BOOLEAN,
  },
  isHighlight: {
    field: 'destaque',
    type: Sequelize.BOOLEAN,
  },
  isPublished: {
    field: 'publicado',
    type: Sequelize.BOOLEAN,
  },
  link: {
    field: 'link',
    type: Sequelize.STRING(2000),
  },
  summary: {
    field: 'descricaoResumida',
    type: Sequelize.STRING(200),
  },
  title: {
    field: 'titulo',
    type: Sequelize.STRING(100),
  },
  type: {
    field: 'idCapacitacaoTipo',
    type: Sequelize.INTEGER(),
  },
  modifyDate: {
    field: 'dataAlteracao',
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  schema: 'dnit',
  tableName: 'Capacitacao',
});

export default Course;
