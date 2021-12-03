import sequelize, { QueryTypes, col } from 'sequelize';
import HttpStatus from 'http-status-codes';
import searchActivities from '../../procedures/searchActivities';

import Activity from '../../models/activity/Activity';
import UserEvaluation from '../../models/survey/UserEvaluation';
import Attachment from '../../models/activity/Attachment';
import Discipline from '../../models/general/Discipline';
import FieldKnowledge from '../../models/general/FieldKnowledge';
import FileType from '../../models/general/FileType';
import Initiative from '../../models/initiative/Initiative';
import KnowledgeObject, { ActivityKnowledgeObject } from '../../models/general/KnowledgeObject';
import Mime from '../../models/general/Mime';
import SchoolYear from '../../models/general/SchoolYear';
import Skill, { ActivitySkill } from '../../models/general/Skill';
import SubTheme from '../../models/general/SubTheme';
import Theme from '../../models/general/Theme';
import TrafficConcept from '../../models/general/TrafficConcept';
import TrafficContent, { ActivityTrafficContent } from '../../models/general/TrafficContent';
import TrafficScope, { ActivityTrafficScope } from '../../models/general/TrafficScope';
import db from '../../config/database';
import HighLights from '../../models/highlight/HighlightItem';
import User from '../../models/user/User';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';

const activityAttributes = [
  'id',
  'idInitiative',
  'code',
  'date',
  'duration',
  'evaluation',
  'otherConnections',
  'reference',
  'resource',
  'teachingArticulation',
  'teachingGuide',
  'title',
  'excludedDate',
];

const setAcitivitySubDetails = async ({
  id,
  idInitiative,
  knowledgeObject = [],
  trafficScope = [],
  trafficContent = [],
  skills = [],
  transaction,
}) => {
  const knowledgeObjectList = knowledgeObject.map(item => ({
    idActivity: id,
    idKnowledgeObject: item,
  }));

  if (idInitiative) {
    await db.query('update dnit.Iniciativa set idStatus = 5 where id = :idInitiative',
      {
        transaction,
        replacements: {
          idInitiative,
        },
        type: QueryTypes.UPDATE,
      });
  }

  await ActivityTrafficScope.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  });

  await ActivitySkill.destroy({
    transaction,
    where: {
      idActivity: id,
    },
  });

  await ActivityTrafficContent.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  });

  await ActivityKnowledgeObject.destroy({
    transaction,
    where: {
      idActivity: id,
    },
  });

  await ActivityKnowledgeObject.bulkCreate(
    knowledgeObjectList,
    {
      transaction,
    },
  );

  await ActivitySkill.bulkCreate(
    skills.map(item => ({ idActivity: id, idSkill: item })),
    {
      transaction,
    },
  );

  await ActivityTrafficScope.bulkCreate(
    trafficScope.map(item => ({
      idAtividade: id,
      idTransitoCompetencia: item,
    })),
    {
      transaction,
    },
  );

  await ActivityTrafficContent.bulkCreate(
    trafficContent.map(item => ({
      idActivity: id,
      idTrafficContent: item,
    })),
    {
      transaction,
    },
  );

  return id;
};

const create = payload => db.transaction(async (transaction) => {
  const currentDate = new Date();

  const atividade = await Activity.create(
    { ...payload, date: currentDate, modifyDate: currentDate },
    {
      transaction,
      fields: [
        'idConcept',
        'idDiscipline',
        'idInitiative',
        'code',
        'date',
        'duration',
        'evaluation',
        'isPublished',
        'otherConnections',
        'reference',
        'resource',
        'teachingGuide',
        'teachingArticulation',
        'title',
        'excludedDate',
        'modifyDate',
      ],
    },
  );

  await setAcitivitySubDetails({
    ...payload,
    id: atividade.dataValues.id,
    transaction,
  });
  return atividade;
});

const update = (payload) => {
  const {
    id,
    ...rest
  } = payload;
  return db.transaction(async (transaction) => {
    await setAcitivitySubDetails({
      ...payload,
      transaction,
    });

    await Activity.update({ ...rest, modifyDate: new Date() }, {
      transaction,
      where: {
        id,
      },
    });
  });
};

const findAll = () => Activity.findAll({
  attributes: [
    ...activityAttributes,
    'idConcept',
    'idDiscipline',
  ],
  include: [
    {
      as: 'trafficConcept',
      attributes: [
        'id',
        'description',
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
      model: TrafficConcept,
    },
    {
      as: 'trafficScope',
      attributes: [
        'id',
        'description',
      ],
      include: [
        {
          as: 'skills',
          attributes: [
            'id',
            'description',
          ],
          model: Skill,
        },
      ],
      model: TrafficScope,
      through: { attributes: [] },
    },
    {
      as: 'discipline',
      attributes: [
        'id',
        'name',
        'color',
      ],
      model: Discipline,
    },
    {
      as: 'knowledgeObject',
      attributes: [
        'id',
        'description',
      ],
      model: KnowledgeObject,
      required: false,
      through: { attributes: [] },
    },
  ],
});
const findAllYear = () => Activity.findAll({
  attributes: [
    activityAttributes[2],
  ],
});

const findById = ({ id, idUser }) => Activity.findByPk(id, {
  attributes: activityAttributes,
  include: [
    {
      as: 'trafficScope',
      attributes: [
        'id',
        'description',
      ],
      model: TrafficScope,
      through: { attributes: [] },
    },
    {
      as: 'trafficConcept',
      attributes: [
        'id',
        'description',
      ],
      include: [
        {
          as: 'schoolYear',
          attributes: [
            'id',
            'ordinal',
          ],
          include: [
            {
              as: 'subTheme',
              attributes: [
                'id',
                'name',
              ],
              model: SubTheme,
              include: [
                {
                  as: 'theme',
                  attributes: [
                    'id',
                    'name',
                  ],
                  model: Theme,
                },
              ],
            },
          ],
          model: SchoolYear,
        },
      ],
      model: TrafficConcept,
    },
    {
      as: 'initiative',
      attributes: [
        'id',
        'title',
      ],
      model: Initiative,
      include: [
        {
          as: 'author',
          attributes: [
            'id',
            'name',
          ],
          model: User,
          include: [
            {
              as: 'instituitions',
              attributes: [
                'id',
                'name',
              ],
              model: EducationalInstitution,
            }
          ]
        },
      ],
    },
    {
      as: 'trafficContent',
      attributes: [
        'id',
        'description',
      ],
      model: TrafficContent,
      through: { attributes: [] },
    },
    {
      as: 'skills',
      attributes: [
        'id',
        'description',
        'idTransitCompetence'
      ],
      model: Skill,
      through: { attributes: [] },
    },
    {
      as: 'discipline',
      attributes: [
        'id',
        'name',
        'color',
      ],
      include: [
        {
          as: 'knowledgeArea',
          attributes: [
            'id',
            'description',
          ],
          model: FieldKnowledge,
        },
      ],
      model: Discipline,
    },
    {
      as: 'knowledgeObject',
      attributes: [
        'id',
        'description',
      ],
      model: KnowledgeObject,
      required: false,
      through: { attributes: [] },
    },
    {
      as: 'attachments',
      attributes: [
        'id',
        'name',
      ],
      include: [{
        as: 'fileType',
        attributes: [
          'id',
          'name',
        ],
        model: FileType,
      },
      {
        as: 'mime',
        attributes: [
          'media',
          'suffix',
        ],
        model: Mime,
      },
      ],
      required: false,
      model: Attachment,
    },
    {
      as: 'userEvaluation',
      attributes: [
        'evaluated',
        'resgitered',
        'status',
      ],
      model: UserEvaluation,
      required: false,
      where: {
        $and: [
          { idUser },
          sequelize.literal('exists(select 1 from dnit.AtividadeAvaliacao)'),
        ],
      },
    },
  ],
})
  .then(data => data.get({ plain: true }))
  .then((result) => {
    if (result) {
      const attachments = [];
      result.attachments.map((file) => {
        if (!attachments[file.fileType.id]) {
          attachments[file.fileType.id] = file.fileType;
          attachments[file.fileType.id].files = [];
        }
        const tmp = { ...file };
        delete tmp.fileType;
        attachments[file.fileType.id].files.push(tmp);
      });

      return ({
        ...result,
        attachments: attachments.filter(item => item),
      });
    }
    return result;
  });

const remove = id => db.transaction(transaction => Attachment.destroy({
  transaction,
  where: {
    idActivity: id,
  },
})
  .then(() => ActivityKnowledgeObject.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  }))
  .then(() => ActivitySkill.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  }))
  .then(() => ActivityTrafficScope.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  }))
  .then(() => ActivityTrafficContent.destroy({
    transaction,
    where: {
      idAtividade: id,
    },
  }))
  .then(() => Activity.destroy({
    transaction,
    where: {
      id,
    },
  })));

const search = ({
  disciplineSubject,
  disciplines,
  isStartYear,
  keyword = '',
  schoolYears,
  trafficContent,
}) => searchActivities({
  disciplineSubject,
  disciplines: disciplines.length ? disciplines.join(';') : null,
  isStartYear,
  keyword,
  schoolYears: schoolYears.length ? schoolYears.join(';') : null,
  trafficContent,
});

const cmsSearch = ({
  keyword,
  page = 1,
  order: sort,
  limit = 0,
}) => {
  const offset = limit * (page - 1);

  const where = (keyword
    ? {
      $or: [
        sequelize.where(col('[Activity].[tituloAtividade]'), { $like: `%${keyword}%` }),
        sequelize.where(col('[discipline->knowledgeArea].[nome]'), { $like: `%${keyword}%` }),
        sequelize.where(col('[discipline].[nome]'), { $like: `%${keyword}%` }),
        sequelize.where(col('[trafficConcept].[texto]'), { $like: `%${keyword}%` }),
        (parseInt(keyword, 10) ? sequelize.where(col('numeroOrdinal'), { $eq: parseInt(keyword, 10) }) : undefined),
      ],
    }
    : undefined);

  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['title', 'asc']);
  else {
    switch (fields[0]) {
      case 'Year': if (fields[1] !== '0') order.push([sequelize.literal('[trafficConcept.schoolYear.ordinal]'), fields[1]]);
        break;
      case 'Name': if (fields[1] !== '0') order.push(['title', fields[1]]);
        break;
      case 'TrafficConcept': if (fields[1] !== '0') order.push([sequelize.literal('[trafficConcept.description]'), fields[1]]);
        break;
      case 'Disciplines': if (fields[1] !== '0') order.push([sequelize.literal('[discipline.name]'), fields[1]]);
        break;
      case 'KnowledgeField': if (fields[1] !== '0') order.push([sequelize.literal('[discipline.knowledgeArea.description]'), fields[1]]);
        break;
      default: order.push(['title', 'asc']);
        break;
    }
  }

  return Activity.findAndCountAll({
    attributes: [
      'id',
      'title',
      'isPublished',
      'excludedDate',
    ],
    include: [
      {
        as: 'trafficConcept',
        attributes: [
          'id',
          'description',
        ],
        include: [
          {
            as: 'schoolYear',
            attributes: [
              'ordinal',
            ],
            include: [
              {
                as: 'subTheme',
                attributes: [
                  'id',
                  'name',
                ],
                model: SubTheme,
                include: [
                  {
                    as: 'theme',
                    attributes: [
                      'id',
                      'name',
                    ],
                    model: Theme,
                  },
                ],
              },
            ],
            model: SchoolYear,
          },
        ],
        model: TrafficConcept,
      },
      {
        as: 'discipline',
        attributes: [
          'id',
          'name',
        ],
        model: Discipline,
        include: [
          {
            as: 'knowledgeArea',
            attributes: [
              'description',
            ],
            model: FieldKnowledge,
          },
        ],
      },
    ],
    limit,
    offset,
    order,
    where,
  });
};

const cmsDownload = ({
  keyword,
  page = 1,
  order: sort,
  limit = 0,
}) => {
  let where = "1=1";
  if (keyword) {
    where = ` ([Activity].[tituloAtividade] LIKE N'%${keyword}%'
        OR[discipline->knowledgeArea].[nome] LIKE N'%${keyword}%'
        OR[discipline].[nome] LIKE N'%${keyword}%'
        OR[trafficConcept].[texto] LIKE N'%${keyword}%') `;
  }

  const sql = `
  SELECT [Activity].[id]                                 AS Id,
  [trafficConcept->schoolYear].[numeroordinal]         AS Ano, 
  [Activity].[tituloatividade]                         AS Titulo, 
  [discipline->knowledgeArea].[nome]                   AS Area_Do_Conhecimento,
  [discipline].[nome]                                  AS Disciplina,
  (SELECT LEFT(Main.Objeto_conhecimento,Len(Main.Objeto_conhecimento)) As "conhecimentos"
	FROM (SELECT DISTINCT 
			(SELECT [t2].[texto]+ ', ' AS [text()]
			  FROM dnit.AtividadeConteudo t1
			  LEFT JOIN [dnit].[AnoEscolarDisciplinaEscolarConteudo] t2 on t1.[idAnoDisciplinaConteudo] = t2.id
			  WHERE t1.[idAtividade] = [Activity].id
			  FOR XML PATH ('')
			) [Objeto_conhecimento]
  ) [Main]) AS Objeto_De_Conhecimento,
  [trafficConcept->schoolYear->subTheme->theme].[nome] AS Tema,
  [trafficConcept->schoolYear->subTheme].[nome]        AS Subtema, 
  [trafficConcept].[texto]                             AS Conceito_Do_Trânsito,
  (SELECT LEFT(Main.TransConteudo,Len(Main.TransConteudo)) As "competencias"
	FROM (SELECT DISTINCT  
				(SELECT [t2].[texto]+ ', ' AS [text()]	
				FROM [dnit].AtividadeTransitoConteudo t1
				LEFT JOIN [dnit].[TransitoConteudo] t2 on t1.[idTransitoConteudo] = t2.id
				WHERE t1.idAtividade = [Activity].id
				FOR XML PATH ('')
  ) [TransConteudo]) [Main]) as Conteúdo_do_Trânsito,
  (SELECT LEFT(Main.Habilidades,Len(Main.Habilidades)) As "habilidades"
	FROM (SELECT DISTINCT  
				(SELECT [t2].[texto]+ ', ' AS [text()]
				FROM dnit.AtividadeTransitoHabilidade t1
				LEFT JOIN [dnit].[TransitoHabilidade] t2 on t1.[idTransitoHabilidade] = t2.id
				WHERE t1.idAtividade = [Activity].id
				FOR XML PATH ('')
				) [Habilidades]
  ) [Main]) as Habilidades,
  (SELECT LEFT(Main.Competencia,Len(Main.Competencia)) As "competencias"
	FROM (SELECT DISTINCT  
				(SELECT [t2].[texto]+ ', ' AS [text()]	
				FROM dnit.AtividadeTransitoCompetencia t1
				LEFT JOIN [dnit].[TransitoCompetencia] t2 on t1.[idTransitoCompetencia] = t2.id
				WHERE t1.idAtividade = [Activity].id
				FOR XML PATH ('')
  ) [Competencia]) [Main]) as Competencias,
  [initiative].[titulo] AS [Iniciativa],
  [usuario].[nome] AS [Professor]
FROM   [dnit].[atividade] AS [Activity] 
  LEFT OUTER JOIN [dnit].[transitoconceito] AS [trafficConcept] 
               ON [Activity].[idtransitoconceito] = [trafficConcept].[id] 
  LEFT OUTER JOIN [dnit].[anoescolar] AS [trafficConcept->schoolYear] 
               ON [trafficConcept].[idanoescolar] = [trafficConcept->schoolYear].[id] 
  LEFT OUTER JOIN [dnit].[atividadesubtema] AS [trafficConcept->schoolYear->subTheme] 
               ON [trafficConcept->schoolYear].[idsubtemaatividade] = [trafficConcept->schoolYear->subTheme].[id] 
  LEFT OUTER JOIN [dnit].[atividadetema] AS [trafficConcept->schoolYear->subTheme->theme] 
               ON [trafficConcept->schoolYear->subTheme].[idtemaatividade] =  [trafficConcept->schoolYear->subTheme->theme].[id] 
  LEFT OUTER JOIN [dnit].[disciplinaescolar] AS [discipline] 
               ON [Activity].[iddisciplinaprincipal] = [discipline].[id] 
  LEFT OUTER JOIN [dnit].[areaconhecimento] AS [discipline->knowledgeArea] 
               ON [discipline].[idareaconhecimento] = [discipline->knowledgeArea].[id]
  LEFT OUTER JOIN [dnit].[Iniciativa] AS [initiative] 
               ON [Activity].[idIniciativa] = [initiative].[id]
  LEFT OUTER JOIN [seguranca].[Usuario] AS [usuario] 
               ON [initiative].[idUsuarioAutor] = [usuario].[id]
WHERE  ` + where + `
ORDER  BY [Activity].[tituloatividade] ASC; `;

  return db.query(sql, {
    type: QueryTypes.SELECT,
  });

};

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Atividade',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar uma atividade em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return Activity.update({
    isPublished,
    excludedDate: (!isPublished ? currentDate : null),
    modifyDate: currentDate,
  },
    {
      transaction,
      where: {
        id,
      },
    })
    .then(() => Activity.findByPk(id, {
      transaction,
      include: [
        {
          as: 'trafficConcept',
          attributes: [
            'id',
            'description',
          ],
          include: [
            {
              as: 'schoolYear',
              attributes: [
                'ordinal',
              ],
              include: [
                {
                  as: 'subTheme',
                  attributes: [
                    'id',
                    'name',
                  ],
                  model: SubTheme,
                  include: [
                    {
                      as: 'theme',
                      attributes: [
                        'id',
                        'name',
                      ],
                      model: Theme,
                    },
                  ],
                },
              ],
              model: SchoolYear,
            },
          ],
          model: TrafficConcept,
        },
        {
          as: 'discipline',
          attributes: [
            'id',
            'name',
          ],
          model: Discipline,
          include: [
            {
              as: 'knowledgeArea',
              attributes: [
                'description',
              ],
              model: FieldKnowledge,
            },
          ],
        },
      ],
    }));
});

export default {
  create,
  cmsSearch,
  cmsDownload,
  findAll,
  findAllYear,
  findById,
  remove,
  search,
  update,
  publish,
};
