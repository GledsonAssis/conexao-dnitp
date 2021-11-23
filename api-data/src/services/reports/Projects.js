import sequelize from 'sequelize';
import Projects from '../../models/project/Project';
import Actions from '../../models/action/Action';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import User from '../../models/user/User';

const getReport = (filters, currentUser) => {
  const {
    idRegionalSuperintendence,
    type,
    category,
    dateInit,
    dateEnd,
    localUnit,
    order: sort,
  } = filters;


  const isPublished = filters.type ? { isPublished: type } : '';
  const where = {};

  if (filters) {
    where.$and = [
      { date: { $between: [dateInit || new Date('1990', '01', '01'), dateEnd || new Date()] } },
      isPublished,
    ];
  }

  if (idRegionalSuperintendence) {
    const param = sequelize.literal(`[author->DnitUnit->RegionalSuperintendence].[id] = ${idRegionalSuperintendence}`);
    where.$and.push(param);
  }

  if (localUnit) {
    const param = sequelize.literal(`[author->DnitUnit].[id] = ${localUnit}`);
    where.$and.push(param);
  }

  if (localUnit && !idRegionalSuperintendence) {
    where.$or = [
      sequelize.literal(`[DnitUnit].[id] = ${localUnit}`),
      sequelize.literal(
        `[DnitUnit->RegionalSuperintendence].[id] = ${localUnit}`
      ),
    ];
  }

  if (
    !(localUnit || idRegionalSuperintendence) &&
    currentUser.idDnitUnit &&
    currentUser.idDnitUnit !== null
  ) {
    where.$or = [
      sequelize.literal(`[DnitUnit].[id] = ${currentUser.idDnitUnit}`),
      sequelize.literal(
        `[DnitUnit->RegionalSuperintendence].[id] = ${currentUser.idDnitUnit}`
      ),
    ];
  }

  let order = [];
  const sorter = sort ? sort.split(',') : '';

  const promisses = [];

  if (!category || category == '1') {
    promisses.push(Projects.findAll({
      attributes: [
        'title',
        'description',
        'isPublished',
      ],
      include: [
        {
          as: 'author',
          attributes: [
            'id',
            'name',
            'email',
          ],
          include: [
            {
              as: 'DnitUnit',
              attributes: [
                'id',
                'identification',
                'idUFSuperintendence',
              ],
              include: [
                {
                  as: 'RegionalSuperintendence',
                  attributes: [
                    'id',
                    'idUFSuperintendence',
                    'identification',
                  ],
                  model: DnitUnit,
                  required: true,
                },
              ],
              model: DnitUnit,
              required: true,
            },
            {
              as: 'instituitions',
              attributes: ['id', 'name'],
              include: [{
                as: 'dnitUnit',
                attributes: [
                  'id',
                  'identificacao',
                ],
                include: [
                  {
                    as: 'RegionalSuperintendence',
                    attributes: [
                      'id',
                      'identificacao',
                    ],
                    model: DnitUnit,
                  },
                ],
                model: DnitUnit,
              }],
              model: EducationalInstitution,
              required: false,
              through: { attributes: [] },
            },
          ],
          model: User,
          required: true,
        },
      ],
      where,
    })
      .then(result => result.map(el => ({ ...el.dataValues, category: 'Projetos' }))));
  }

  if (!category || category == '2') {
    promisses.push(Actions.findAll({
      attributes: [
        'title',
        'description',
        'isPublished',
      ],
      include: [
        {
          as: 'author',
          attributes: [
            'id',
            'name',
            'email',
          ],
          include: [
            {
              as: 'instituitions',
              attributes: ['id', 'name'],
              include: [{
                as: 'dnitUnit',
                attributes: [
                  'id',
                  'identificacao',
                ],
                include: [
                  {
                    as: 'RegionalSuperintendence',
                    attributes: [
                      'id',
                      'identificacao',
                    ],
                    model: DnitUnit,
                  },
                ],
                model: DnitUnit,
              }],
              model: EducationalInstitution,
              required: false,
              through: { attributes: [] },
            },
            {
              as: 'DnitUnit',
              attributes: [
                'id',
                'identification',
                'idUFSuperintendence',
              ],
              include: [
                {
                  as: 'RegionalSuperintendence',
                  attributes: [
                    'id',
                    'idUFSuperintendence',
                    'identification',
                  ],
                  model: DnitUnit,
                  required: true,
                },
              ],
              model: DnitUnit,
              required: true,
            },
          ],
          model: User,
          required: true,
        },
      ],
      where,
    })
      .then(result => result.map(el => ({ ...el.dataValues, category: 'Ações' }))));
  }


  return Promise.all(promisses)
    .then(result => ([
      ...result[0] || [],
      ...result[1] || [],
    ]))
    .then(list => list.map(({
      isPublished,
      summary,
      title,
      category,
      author,
    }) => ({
      Situação: isPublished ? 'Publicado' : 'Salvo',
      Categoria: category,
      Título: title,
      Sumário: summary,
      'Superintendência Regional': author ? author.DnitUnit.RegionalSuperintendence.identification : '',
      'Unidade Local': author ? author.DnitUnit.identification : '',
    })))
    .then((result) => {
      switch (sorter[0]) {
        case 'Título':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.title > next.title ? 1 : -1) : (curr.title > next.title ? -1 : 1));
          break;
        case 'Situação':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.isPublished > next.isPublished ? 1 : -1) : (curr.isPublished > next.isPublished ? -1 : 1));
          break;
        case 'Sumário':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr.summary > next.summary ? 1 : -1) : (curr.summary > next.summary ? -1 : 1));
          break;
        case 'Superintendência Regional':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr['Superintendência Regional'] > next['Superintendência Regional'] ? 1 : -1) : (curr['Superintendência Regional'] > next['Superintendência Regional'] ? -1 : 1));
          break;
        case 'Unidade Local':
          order = (curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? (curr['Unidade Local'] > next['Unidade Local'] ? 1 : -1) : (curr['Unidade Local'] > next['Unidade Local'] ? -1 : 1));
          break;
        case 'Categoria':
          order = (curr, next) => {
            if (curr.category === next.category) return 0;

            if ((sorter[1].toUpperCase()) !== 'DESC') return (curr.category > next.category ? -1 : 1);

            return (curr.category > next.category ? 1 : -1);
          };
          break;
        default:
          order = (curr, next) => curr.id - next.id;
      }

      return result.sort((curr, next) => (sorter[1] && (sorter[1].toUpperCase()) !== 'DESC' ? curr.id - next.id : next.id - curr.id))
        .sort(order);
    });
};

export default {
  getReport,
};
