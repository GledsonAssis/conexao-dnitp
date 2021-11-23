import sequelize, { QueryTypes } from 'sequelize';
import moment from 'moment';
import db from '../../config/database';

const getReport = (filters) => {
  const {
    type,
    situation,
    periodStart = moment(new Date()).subtract('7', 'days'),
    periodEnd = new Date(),
    activity: {
      year,
      discipline,
      trafficContent,
      knowledgeObject,
      activity,
    },
    teacher: {
      regionalSuperintendences,
      institution,
      dnitLocalUnit,
      user,
    },
  } = filters;

  let fields = '*';
  let where = '';

  switch (parseInt(type, 0)) {
    case 1: fields = ` '1' as type,
    status.nome                               AS situation,
    [activity->trafficConcept].[idAnoEscolar] AS year,
    [activity->discipline].[nome]             AS discipline,
    [user].[nome]                             AS teacher,
    [activity].[tituloAtividade]              AS activity,
    superintendence.identificacao             as regionalSuperintendence,
    dnitUnit.identificacao                    as dnitLocalUnit,
    (select top 1 instituicao.identificacao
      from dnit.InstituicaoEnsino as instituicao
       where UsuarioInstituicaoEnsino.idInstituicaoEnsino = instituicao.id) as institution`;
      break;
    case 2: fields = ` '2' as type,
    status.nome                               AS situation,
    [activity->trafficConcept].[idAnoEscolar] AS year,
    [activity->userEvaluation].dataAvaliacao  AS date,   
    [user].[nome]                             AS teacher,
    superintendence.identificacao             as regionalSuperintendence,
    dnitUnit.identificacao                    as dnitLocalUnit,
    (select top 1 instituicao.identificacao
      from dnit.InstituicaoEnsino as instituicao
       where UsuarioInstituicaoEnsino.idInstituicaoEnsino = instituicao.id) as institution`;
      break;
    case 3: fields = ` '3' as type,
      [activity->trafficConcept].[idAnoEscolar] AS year,
      [activity->userEvaluation].dataAvaliacao  AS date,   
      [user].[nome]                             AS teacher,
      (select top 1 instituicao.identificacao
        from dnit.InstituicaoEnsino as instituicao
         where UsuarioInstituicaoEnsino.idInstituicaoEnsino = instituicao.id) as institution,
      superintendence.identificacao                   AS regionalSuperintendence,
      dnitUnit.identificacao                          AS dnitLocalUnit,
      [activity].[tituloAtividade]                    AS activity,
      AtividadeAvaliacaoPergunta.pergunta             AS question,   
      AtividadeAvaliacaoPerguntaAlternativa.descricao AS alternative,
       UserEvaluationAnswer.justificativa             AS justify`;
      break;
    default: fields = '';
      break;
  }

  where = `where (${situation == 2 ? '[activity->userEvaluation].dataAvaliacao' : '[activity->userEvaluation].dataRegistro'} between '${
    moment(periodStart).format('YYYY-MM-DDT00:00:00.000')}' and '${moment(periodEnd).format('YYYY-MM-DDT23:59:59.999')}')
  and ([activity->userEvaluation].[idAvaliacaoStatus] = ${situation})`;

  if (year) where += `and ([activity->trafficConcept].[idAnoEscolar] = ${year})\n`;

  if (discipline) where += `and ([activity->discipline].id = ${discipline})\n`;

  if (trafficContent) where += `and ([AtividadeTransitoConteudo].idTransitoConteudo = ${trafficContent})\n`;

  if (knowledgeObject) where += `and ([AtividadeConteudo].idAnoDisciplinaConteudo = ${knowledgeObject})\n`;

  if (activity) where += `and ([activity].id = ${activity})\n`;

  if (regionalSuperintendences) where += `and (superintendence.id = ${regionalSuperintendences})\n`;

  if (institution) where += `and (UsuarioInstituicaoEnsino.idInstituicaoEnsino = ${institution})\n`;

  if (dnitLocalUnit) where += `and (dnitUnit.id = ${dnitLocalUnit})\n`;

  if (user) where += `and ([User].id = ${user})\n`;

  const sql = `SELECT distinct ${fields}
    FROM [dnit].[AtividadeUsuarioAvaliacao] AS [activity->userEvaluation]
    JOIN [seguranca].[Usuario] AS [user] ON [activity->userEvaluation].[idUsuario] = [user].[id]
    LEFT JOIN [seguranca].UsuarioInstituicaoEnsino as UsuarioInstituicaoEnsino on UsuarioInstituicaoEnsino.idUsuario = [user].id
    join [dnit].[AtividadeUsuarioAvaliacaoStatus] status on status.id = [activity->userEvaluation].idAvaliacaoStatus
    join dnit.AtividadeAvaliacao as AtividadeAvaliacao on AtividadeAvaliacao.id = [activity->userEvaluation].idAtividadeAvaliacao
    JOIN [dnit].[AtividadeAvaliacaoSecao] AS [AtividadeAvaliacaoSecao] on [AtividadeAvaliacaoSecao].idAtividadeAvaliacao = AtividadeAvaliacao.id
    JOIN [dnit].[AtividadeAvaliacaoPergunta] AS [AtividadeAvaliacaoPergunta] ON [AtividadeAvaliacaoSecao].id = [AtividadeAvaliacaoPergunta].[idAtividadeAvaliacaoSecao]
    LEFT JOIN [dnit].[AtividadeUsuarioAvaliacaoResposta] AS [UserEvaluationAnswer]
        ON [activity->userEvaluation].[id] = [UserEvaluationAnswer].[idAtividadeUsuarioAvaliacao]
      and [UserEvaluationAnswer].[idAtividadeAvaliacaoPergunta] = AtividadeAvaliacaoPergunta.id
      and  [UserEvaluationAnswer].idUsuario = [user].id
    left JOIN [dnit].[AtividadeAvaliacaoPerguntaAlternativa] AS [AtividadeAvaliacaoPerguntaAlternativa]
        ON [AtividadeAvaliacaoPerguntaAlternativa].[idAtividadeAvaliacaoPergunta] = [AtividadeAvaliacaoPergunta].id
      and [AtividadeAvaliacaoPerguntaAlternativa].[id] =[UserEvaluationAnswer].idAtividadeAvaliacaoAlternativa
    JOIN [dnit].[Atividade] AS [activity] ON [activity->userEvaluation].[idAtividade] = [activity].[id]
    LEFT JOIN [dnit].[DisciplinaEscolar] AS [activity->discipline] ON [activity].[idDisciplinaPrincipal] = [activity->discipline].[id]
    LEFT JOIN [dnit].[TransitoConceito] AS [activity->trafficConcept] ON [activity].[idTransitoConceito] = [activity->trafficConcept].[id]
    LEFT JOIN [dnit].[AtividadeConteudo] AS [AtividadeConteudo] on [AtividadeConteudo].idAtividade = [activity].[id]        
    LEFT JOIN [dnit].[AtividadeTransitoConteudo] AS [AtividadeTransitoConteudo] ON [activity].[id] = [AtividadeTransitoConteudo].idAtividade
    LEFT JOIN [dnit].[UnidadeDnit] AS [dnitUnit] ON  [dnitUnit].[id] = coalesce([UserEvaluationAnswer].[idUnidadeDnit], [user].[idUnidadeDnit])
    LEFT JOIN [dnit].[UnidadeDnit] AS [superintendence] ON [dnitUnit].[idSuperintendenciaRegional] = [superintendence].[id]
  ${where}; `;

  return db.query(sql, {
    type: QueryTypes.SELECT,
  });
};

export default {
  getReport,
};
