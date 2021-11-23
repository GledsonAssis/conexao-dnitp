import sequelize from 'sequelize';
import moment from 'moment';
import Model from '../../models/activity/FileDownload';
import Attachment from '../../models/activity/Attachment';
import Activity from '../../models/activity/Activity';
import FileType from '../../models/general/FileType';
import TrafficConcept from '../../models/general/TrafficConcept';
import SchoolYear from '../../models/general/SchoolYear';
import User from '../../models/user/User';
import UserService from '../user/User';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import Discipline from '../../models/general/Discipline';

import db from '../../config/database';

const getReport = async (filters, user) => {
  const {
    dateInit = moment('1990-01-01').format('YYYY-MM-DDTHH:mm:ss'),
    dateEnd = new Date(),
    idRegionalSuperintendence: idSuperintendencia,
    localUnit: idUnidadeLocal,
    educationalInstitution: idInstituicaoEnsino,
    order: sort,
    year: anoOrdinal,
    discipline,
    activity,
  } = filters;

  const where = (filters ? {
    $and: [
      {
        dataHoraDownload: {
          $between: [dateInit, moment(dateEnd)
            .hour('23')
            .minute(59)
            .second(59)
            .format('YYYY-MM-DDTHH:mm:ss')],
        },
      },
    ],
  } : undefined);

  if(discipline) {
    where.$and.push(sequelize.literal(`[attachments->Activity->discipline].[id] = ${discipline}`))
  }

  if(activity) {
    where.$and.push(sequelize.literal(`[attachments->Activity].[id] = ${activity}`))
  }

  if (anoOrdinal) where.$and.push(sequelize.literal(`[attachments->Activity->trafficConcept->schoolYear].[numeroOrdinal] = ${anoOrdinal}`));

  if (idInstituicaoEnsino && idInstituicaoEnsino > 0) {
    where.$and.push(
      sequelize.literal(`exists (select 1 from [seguranca].[UsuarioInstituicaoEnsino] where idInstituicaoEnsino = ${idInstituicaoEnsino} and idUsuario = [User].[id])`),
    );
  }

  if (idUnidadeLocal) {
    const param = sequelize.literal(`[User->DnitUnit].[id] = ${idUnidadeLocal}`);
    where.$and.push(param);
  }

  if (idSuperintendencia) {
    const param = sequelize.literal(`[User->DnitUnit->RegionalSuperintendence].[id] = ${idSuperintendencia}`);
    where.$and.push(param);
  }

  if (!(idUnidadeLocal || idSuperintendencia) && user.idDnitUnit && user.idDnitUnit !== null) {
    where.$or = [
      sequelize.literal(`[User->DnitUnit].[id] = ${user.idDnitUnit}`),
      sequelize.literal(`[User->DnitUnit->RegionalSuperintendence].[id] = ${user.idDnitUnit}`),
    ];
  }

  let order = [];
  const sorter = sort ? sort.split(',') : '';
  order = [['dataHoraDownload', 'DESC']];
  if (sorter[1] !== '0') {
    switch (sorter[0]) {
      case 'Ano':
        order = [[sequelize.col('[attachments->Activity->trafficConcept->schoolYear].[numeroOrdinal] '), sorter[1] || 'ASC']];
        break;
      case 'Disciplina':
        order = [[sequelize.col('[attachments->Activity->discipline].[nome] '), sorter[1] || 'ASC']];
        break;
      case 'Atividade':
        order = [[sequelize.col('[attachments->Activity].[tituloAtividade] '), sorter[1] || 'ASC']];
        break;
      case 'Data Download':
        order = [[sequelize.col('dataHoraDownload'), sorter[1] || 'ASC']];
        break;
      case 'Nome do Professor':
        order = [[sequelize.col('User].[nome]'), sorter[1] || 'ASC']];
        break;
      case 'Superintendência':
        order = [[sequelize.col('[User->DnitUnit->RegionalSuperintendence].[identificacao]'), sorter[1] || 'ASC']];
        break;
      case 'Unidade Local':
        order = [[sequelize.col('[User->DnitUnit].[identificacao]'), sorter[1] || 'ASC']];
        break;
      case 'Instituição de Ensino':
        order = [[sequelize.literal('2'), sorter[1] || 'ASC']];
        break;
      case 'Tipo':
        order = [[sequelize.literal('[attachments->fileType].[nome]'), sorter[1] || 'ASC']];
        break;
      default:
        break;
    }
  }

  return Model.findAll({
    attributes: [
      'dataHoraDownload',
      sequelize.literal(`( SELECT STUFF(
        (SELECT ', ' + iie.identificacao
         FROM [seguranca].[UsuarioInstituicaoEnsino] UIE
                  INNER JOIN dnit.InstituicaoEnsino IIE ON (IIE.id = UIE.idInstituicaoEnsino)
         WHERE (UIE.idUsuario = [User].[id])
         FOR XML PATH (''), TYPE).value('.', 'varchar(max)'), 1, 1, ''
    )) as instituitions`, 'instituitions'),
    ],
    include: [
      {
        model: User,
        attributes: [
          'id',
          'name',
          'email',
        ],
        include: [
          {
            model: DnitUnit,
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
                required: false,
              },
            ],
            required: false,
          },
        ],
      },
      {
        model: Attachment,
        as: 'attachments',
        attributes: [],
        include: [{
          model: FileType,
          as: 'fileType',
          attributes: ['name'],
        },
        {
          model: Activity,
          include: [
            {
              model: TrafficConcept,
              as: 'trafficConcept',
              attributes: [
                'id',
                'texto',
              ],
              include: [
                {
                  as: 'schoolYear',
                  attributes: [
                    'ordinal',
                  ],
                  model: SchoolYear,
                },
              ],
            },
            {
              model: Discipline,
              as: 'discipline',
              attributes: [
                'id',
                'nome',
              ],
            },
          ],
          required: false,
        }],
      },
    ],
    raw: true,
    order,
    where,
  })
    .then(list => list.map(el => ({
        Ano: el['attachments.Activity.trafficConcept.schoolYear.ordinal'],
        Disciplina: el['attachments.Activity.discipline.nome'],
        Atividade: el['attachments.Activity.title'],
        'Data Download': moment(el.dataHoraDownload).format('DD/MM/YYYY'),
        'Nome do Professor': el['User.name'],
        Tipo: el['attachments.fileType.name'],
        Superintendência: el['User.DnitUnit.RegionalSuperintendence.identification'],
        'Unidade Local': el['User.DnitUnit.identification'],
        'Instituição de Ensino': el.instituitions,
      })));
};

export default {
  getReport,
};
