import moment from 'moment';
import User from '../../models/user/User';
import Address from '../../models/general/Address';
import City from '../../models/general/City';
import State from '../../models/general/State';

import ActionRating from '../../models/action/UserRating';
import ActionComment from '../../models/action/UserComment';

import CourseRating from '../../models/course/UserRating';
import CourseComment from '../../models/course/UserComment';

import ProjectRating from '../../models/project/UserRating';
import ProjectComment from '../../models/project/UserComment';

import ProjectActionRating from '../../models/projectAction/UserRating';
import ProjectActionComment from '../../models/projectAction/UserComment';

const include = [
  {
    as: 'author',
    attributes: ['id'],
    include: [
      {
        as: 'address',
        attributes: ['id'],
        include: [
          {
            as: 'city',
            attributes: ['id'],
            include: [
              {
                as: 'state',
                attributes: ['initials'],
                model: State,
              },
            ],
            model: City,
            required: false,
          },
        ],
        model: Address,
        required: false,
      },
      {
        as: 'city',
        attributes: ['id'],
        include: [
          {
            as: 'state',
            attributes: ['initials'],
            model: State,
          },
        ],
        model: City,
        required: false,
      },
    ],
    model: User,
    required: false,
  },
];

const getReport = (filters) => {
  const {
    type,
    category,
    dateInit,
    dateEnd,
    uf,
    order: sort,
  } = filters;

  let order = [];
  const sorter = sort ? sort.split(',') : '';

  const where = {
    $and: [
      { dateTime: { $between: [dateInit || new Date('1990', '01', '01'), dateEnd || new Date()] } },
    ],
  };

  const promisses = [];

  if ((!category) || (category == 1)) {
    if ((!type) || (type == 1)) {
      promisses.push(
        ActionRating.findAll({
          include,
          where,
        })
          .then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Ações', type: 1 }))),
      );
    }

    if (!type || type == 2) {
      promisses.push(
        ActionComment.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Ações', type: 2 }))),
      );
    }
  }

  if (!category || category == 2) {
    if (!type || type == 1) {
      promisses.push(
        ProjectActionRating.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Ações de Projeto', type: 1 }))),
      );
    }

    if (!type || type == 2) {
      promisses.push(
        ProjectActionComment.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Ações de Projeto', type: 2 }))),
      );
    }
  }

  if (!category || category == 3) {
    if (!type || type == 1) {
      promisses.push(
        CourseRating.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Cursos', type: 1 }))),
      );
    }

    if (!type || type == 2) {
      promisses.push(
        CourseComment.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Cursos', type: 2 }))),
      );
    }
  }

  if (!category || category == 4) {
    if (!type || type == 1) {
      promisses.push(
        ProjectRating.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Projetos', type: 1 }))),
      );
    }

    if (!type || type == 2) {
      promisses.push(
        ProjectComment.findAll({
          include,
          where,
        }).then(result => result.map(el => ({ ...el.get({ plain: true }), category: 'Projetos', type: 2 }))),
      );
    }
  }

  return Promise.all(promisses)
    .then(async result => ([
      ...(result[0] || []),
      ...(result[1] || []),
      ...(result[2] || []),
      ...(result[3] || []),
      ...(result[4] || []),
      ...(result[5] || []),
      ...(result[6] || []),
      ...(result[7] || []),
    ]))
    .then(list => list.map(({
      dateTime,
      category: Categoria,
      type: Tipo,
      author,
      rating,
    }) => ({
      Tipo: Tipo == 2 ? 'Comentário' : 'Classificação',
      Categoria,
      Data: moment(dateTime),
      UF: author && author.city && author.city.state ? author.city.state.initials : '',
      Classificação: rating ? rating : '',
    })))
    .then(list => list.filter((value) => {
      if (uf && value.UF === uf) return list;
      if (!uf) return list;
    }))
    .then((list) => {
      switch (sorter[0]) {
        case 'Tipo':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.Tipo > next.Tipo ? 1 : -1) : (curr.Tipo > next.Tipo ? -1 : 1));
          break;
        case 'Categoria':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.Categoria > next.Categoria ? 1 : -1) : (curr.Categoria > next.Categoria ? -1 : 1));
          break;
        case 'Data':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.Data > next.Data ? 1 : -1) : (curr.Data > next.Data ? -1 : 1));
          break;
        case 'UF':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.UF > next.UF ? 1 : -1) : (curr.UF > next.UF ? -1 : 1));
          break;
        case 'Classificação':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.Classificação > next.Classificação ? 1 : -1) : (curr.Classificação > next.Classificação ? -1 : 1));
          break;
        default:
          order = (curr, next) => (curr.Data > next.Data ? -1 : 1);
      }

      return list.sort((curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? curr.id - next.id : next.id - curr.id))
        .sort(order).map(item => ({ ...item, Data: moment(item.Data).format('DD/MM/YYYY') }));
    });
};

export default {
  getReport,
};
