import sequelize, { QueryTypes } from 'sequelize';
import db from '../../config/database';
import HighlightItem, { HighlightMural } from '../../models/highlight/HighlightItem';
import Message from '../../models/message/Message';
import User from '../../models/user/User';
import courseTypeWhereClause from '../../utils/validators/courseTypeWhereClause';
import { canViewActivationAction } from '../../utils/validators/roleValidator';

const HighlightTypes = {
  Curso: 1,
  Atividade: 2,
  Projeto: 3,
  'Link Externo': 4,
  'Ação de Projeto': 5,
  'Ação de Ativação': 6,
  Práticas: 7,
};

const findAll = () => HighlightItem.findAndCountAll({
  attributes: [
    'id',
    'title',
    'type',
    'highlighted',
    'position',
    'creationDate',
    'modifyDate',
  ],
});

const search = ({order: sort, type, startDate, endDate}) => {
  let order = [['highlighted', 'desc'], ['position', 'asc']];
  const defaultOrder = [['creationDate', 'desc'], ['modifyDate', 'desc']];

  let fields;

  if (sort) {
    fields = sort.split(',');
  }

  if (fields) {
    if (fields[1] === '0') {
      order = order.concat(defaultOrder);
    } else {
      switch (fields[0]) {
        case 'title': if (fields[1] !== '0') order.push(['title', fields[1]]);
          break;
        case 'type': if (fields[1] !== '0') order.push(['type', fields[1]]);
          break;
        case 'creationDate': if (fields[1] !== '0') order.push(['creationDate', fields[1]]);
          break;
        case 'modifyDate': if (fields[1] !== '0') order.push(['modifyDate', fields[1]]);
          break;
        default: order = order.concat(defaultOrder);
          break;
      }
    }
  } else {
    order = order.concat(defaultOrder);
  }

  let where = {};
  let hasFilter = false;
  const andConditions = [];
  const orConditions = [];
 
  if (startDate && endDate) {
    andConditions.push({ creationDate: { $between: [startDate, endDate] } });
    hasFilter = true;
  }

  if (type) {
    andConditions.push({ typeId: type });
    hasFilter = true;
  }

  if (hasFilter) {
    orConditions.push({highlighted: true});
    orConditions.push({$and: andConditions});
    where = {$or: orConditions};
  } 


  return HighlightItem.findAndCountAll({
    attributes: [
      'id',
      'title',
      'type',
      'highlighted',
      'position',
      'creationDate',
      'modifyDate',
    ],
    where,
    order,
  });
};

const findHighlights = currentUser => Promise.all([
  HighlightMural.findAll({ order: ['position'] }),
  courseTypeWhereClause(currentUser),
])
  .then(([
    highlights,
    { type: { $in: courseTypes } },
  ]) => {
    const highlightsWithFilteredCourses = [];
    highlights.forEach((highlight) => {
      if (highlight.type === 'Curso') {
        if (courseTypes.includes(parseInt(highlight.extra, 10))) {
          highlightsWithFilteredCourses.push(highlight);
        }
      } else if (highlight.type === 'Ação de Ativação') {
        if (currentUser && canViewActivationAction(currentUser.role.id)) {
          highlightsWithFilteredCourses.push(highlight);
        }
      } else {
        highlightsWithFilteredCourses.push(highlight);
      }
    });

    return highlightsWithFilteredCourses;
  });

const updateHighlightItems = payload => db.transaction(async (transaction) => {
  const oldHighlights = await HighlightMural.findAll({
    transaction,
    where: {
      ordem: {
        $gt: 0,
      },
    },
  })
    .then(list => list.map(el => el.get({ plain: true })));

  db.query('delete from dnit.MuralItem', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemAcao', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemAtividade', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemCapacitacao', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemLinkExterno', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemPratica', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemProjeto', { transaction, type: QueryTypes.RAW });
  db.query('delete from dnit.MuralItemProjetoAcao', { transaction, type: QueryTypes.RAW });


  const userList = await User.findAll({
    transaction,
    where: {
      active: true,
    },
  })
    .then(users => users.map(user => ({
      idMessageType: process.env.EVALUATION_MESSAGE_TYPE,
      idUserFrom: 2,
      idUserRecipient: user.id,
      subject: 'Novos Conteúdos disponíveis',
    })));

  await payload.forEach(async (highlight) => {
    await db.query('exec [dnit].[spi_mural_destacar] :id, :idTipo,:destacar,:ordem',
      {
        replacements: {
          id: highlight.id,
          idTipo: HighlightTypes[highlight.type],
          destacar: highlight.highlighted,
          ordem: highlight.position,
        },
        transaction,
        type: QueryTypes.RAW,
      })
      .then(() => {
        const found = oldHighlights.some(item => item.id === highlight.id && item.type === highlight.type);

        if (found) return false;

        return Message.bulkCreate(
          userList,
          { returning: [] },
        )
          .then(lista => lista.map(el => el.get({ plain: true })))
          .then(lista => lista.map((mensagem) => {
            const query = 'insert into dnit.Mensagemresposta (idMensagem,idUsuario,dataHora,lido,texto) values (:idMensagem, :idUsuario, :dataHora,0,:texto)';
            db.query(query,
              {
                replacements: {
                  idMensagem: mensagem.id,
                  idUsuario: mensagem.idUserFrom,
                  dataHora: new Date(),
                  texto: `${highlight.type}: ${highlight.title}`,
                },
                type: QueryTypes.SELECT,
              });
            return mensagem;
          }));
      });
  });
});

const listHighlightTypes = () => HighlightItem.findAll({
    attributes: [
      'type',
      'typeId',
    ],
    group: ['tipo', 'identificadorTipo'],
  }, [['type', 'asc']],
);

export default {
  findAll,
  findHighlights,
  updateHighlightItems,
  search,
  listHighlightTypes,
};
