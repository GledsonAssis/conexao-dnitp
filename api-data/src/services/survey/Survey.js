/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { QueryTypes } from 'sequelize';
import db from '../../config/database';
import Survey from '../../models/survey/Survey';
import Section from '../../models/survey/Section';
import Question from '../../models/survey/Question';
import Alternative from '../../models/survey/Alternative';
import UserEvaluation from '../../models/survey/UserEvaluation';
import UserEvaluationAnswer from '../../models/survey/UserEvaluationAnswer';

const createSurvey = payload => db.transaction()
  .then(async (transaction) => {
    const {
      active,
      description,
      sections,
      title,
      version,
      id,
    } = payload;

    let query;
    try {
      const newVersion = (version || 0) + 1;
      const survey = await Survey.create({
        active,
        description,
        title,
        version: newVersion,
      },
        {
          transaction,
        });


      if (survey && sections) {
        for (let sectIndex = 0; sectIndex < sections.length; sectIndex++) {
          const section = await Section.create({
            ...sections[sectIndex],
            idSurvey: survey.id,
          },
            {
              transaction,
            })
            .then(el => ({ ...el.get({ plain: true }), ...sections[sectIndex] }));

          for (let questIndex = 0; questIndex < section.questions.length || 0; questIndex++) {
            const {
              type,
              question,
              required,
            } = section.questions[questIndex];

            query = `INSERT INTO [dnit].[AtividadeAvaliacaoPergunta] ([idAtividadeAvaliacaoSecao],[idAtividadeAvaliacaoPerguntaTipo],[pergunta],[obrigatoria]) 
            OUTPUT INSERTED.* VALUES (:idAtividadeAvaliacaoSecao,:idAtividadeAvaliacaoPerguntaTipo,:pergunta,:obrigatoria)`;
            const questao = await db.query(query,
              {
                replacements: {
                  idAtividadeAvaliacaoSecao: section.id,
                  idAtividadeAvaliacaoPerguntaTipo: type,
                  pergunta: question,
                  obrigatoria: required,
                },
                transaction,
                type: QueryTypes.INSERT,
              })
              .then(el => el[0][0])
              .then(({
                id: idQuestion,
                idAtividadeAvaliacaoPerguntaTipo,
                pergunta,
                idAtividadeAvaliacaoSecao,
                obrigatoria,
              }) => ({
                id: idQuestion,
                idSection: idAtividadeAvaliacaoSecao,
                question: pergunta,
                type: idAtividadeAvaliacaoPerguntaTipo,
                required: obrigatoria,
              }))
              .then(el => ({ ...el, ...section.questions[questIndex] }));

            for (let alterIndex = 0; alterIndex < questao.alternatives.length || 0; alterIndex++) {
              const {
                option,
                is_justify,
              } = questao.alternatives[alterIndex];

              query = `INSERT INTO [dnit].[AtividadeAvaliacaoPerguntaAlternativa] ([idAtividadeAvaliacaoPergunta],[descricao],[justificar]) 
              OUTPUT INSERTED.* VALUES (:idAtividadeAvaliacaoPergunta,:descricao,:justificar) `;
              await db.query(query,
                {
                  replacements: {
                    idAtividadeAvaliacaoPergunta: questao.id,
                    descricao: option || '',
                    justificar: is_justify || false,
                  },
                  transaction,
                  type: QueryTypes.INSERT,
                });
            }
          }
        }
      }
      if (id != "novo" && id) {
        query = `UPDATE [dnit].[AtividadeAvaliacao]
                       SET [ativo] = 0
                     WHERE id =${id} `;
        await db.query(query,
          {
            transaction,
            type: QueryTypes.UPDATE,
          });

        query = `UPDATE [dnit].[AtividadeUsuarioAvaliacao]
                        SET [idAtividadeAvaliacao] = ${survey.id}
                      WHERE idAtividadeAvaliacao =${id}
                        AND idAvaliacaoStatus = 1 `;
        await db.query(query,
          {
            transaction,
            type: QueryTypes.UPDATE,
          });
      }
      transaction.commit();
      return survey.id;

    } catch (err) {
      transaction.rollback();
    }
  })
  .then(id => Survey.findByPk(
    id,
    {
      include: [
        {
          as: 'sections',
          include: [
            {
              as: 'questions',
              include: [
                {
                  as: 'alternatives',
                  model: Alternative,
                },
              ],
              model: Question,
            },
          ],
          model: Section,
        },
      ],
    },
  ));



const countAll = options => Survey.count();


const getById = id => Survey.find({
  attributes: [
    'id',
    'version',
    'title',
    'description',
    'active',
  ],
  include: [
    {
      as: 'sections',
      attributes: [
        'title',
        'description',
        'active',
      ],
      include: [
        {
          as: 'questions',
          attributes: [
            'type',
            'question',
            'required',
          ],
          include: [
            {
              as: 'alternatives',
              attributes: [
                'option',
                'is_justify',
              ],
              model: Alternative,
            },
          ],
          model: Question,
        },
      ],
      model: Section,
    },
  ],
  where: {
    id
  },
});

const findAll = options => Survey.findAll({
  include: [
    {
      as: 'sections',
      include: [
        {
          as: 'questions',
          include: [
            {
              as: 'alternatives',
              model: Alternative,
            },
          ],
          model: Question,
        },
      ],
      model: Section,
    },
  ],
  ...options,
  order: [
    ['date', 'desc']
  ]
})
  .then(result => result.map(item => item.get({ plain: true })))
  .then(list => ({ count: list.length, rows: list }));


const findOne = options => Survey.findOne({
  include: [
    {
      as: 'sections',
      include: [
        {
          as: 'questions',
          include: [
            {
              as: 'alternatives',
              model: Alternative,
            },
          ],
          model: Question,
        },
      ],
      model: Section,
    },
  ],
  ...options,
})
  // .then(result => result.get({ plain: true }))
  ;

const saveSurveyAnswer = payload => db.transaction()
  .then(async (transaction) => {
    const {
      idActivity,
      idUser,
      idDnitUnit,
      answer,
    } = payload;
    try {
      const evaluation = await UserEvaluation.findOne({
        transaction,
        where: {
          idActivity,
          idUser,
        },
      })
        .then(eva => eva.get({ plain: true }));

      if (!evaluation.answer || !evaluation.answer.length > 0) {
        await UserEvaluation.update({
          status: 2,
          evaluated: new Date(),
          answer,
        },
          {
            transaction,
            where: {
              idActivity,
              idUser,
            },
          });

        const reducerQuestions = (accumulator, { questions }) => {
          accumulator.push(...questions.map(({ id: idQuestion, type, alternatives }) => ({
            idActivity,
            idUser,
            idQuestion,
            alternatives: type === 1 ? alternatives : alternatives.filter(alternativa => alternativa.selected === true),
          })));
          return accumulator;
        };

        const reducerAlternativas = (accumulator, {
          alternatives,
          ...rest
        }) => {
          accumulator.push(...alternatives.map(({ id: idAlternative, justify }) => ({
            ...rest,
            idEvaluation: evaluation.id,
            idAlternative,
            idDnitUnit,
            answer: (justify || '').toString(),
          })));
          return accumulator;
        };

        const {
          sections,
        } = JSON.parse(answer);

        await UserEvaluationAnswer.bulkCreate(
          sections
            .reduce(reducerQuestions, [])
            .reduce(reducerAlternativas, []),
          {
            transaction,
          },
        );

        transaction.commit();
      } else {
        transaction.rollback();
      }
    } catch (error) {
      console.log(error);
      transaction.rollback();
    }
    return idActivity;
  });

const findUserEvaluation = ({
  idUser,
  idActivity,
}) => UserEvaluation.findOne({ where: { idUser, idActivity } });

export default {
  createSurvey,
  findAll,
  findOne,
  findUserEvaluation,
  getById,
  saveSurveyAnswer,
  countAll,
};
