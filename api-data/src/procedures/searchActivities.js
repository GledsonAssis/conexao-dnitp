import sequelize from 'sequelize';

import db from '../config/database';

/**
  @ordenaAno BIT = 1,
  @direcaoOrdenacaoAno BIT = 1,
  @ordenaDisciplinaNome BIT = 0,
  @direcaoOrdenacaoDisciplinaNome BIT = 1
*/
export default ({
  disciplines = null,
  disciplineSubject = null,
  schoolYears = null,
  isStartYear = null,
  keyword,
  trafficContent = null,
}) => {
  let searchTerm = '""';
  if (keyword) {
    searchTerm = `"*${keyword.split(' ').filter(key => !!key.trim()).join('*" OR "*')}*"`;
  }

  return db.query(`EXEC [dnit].[spr_buscaAtividade]
    @ano = :schoolYears,
    @anoInicial = :isStartYear,
    @conteudoCurricular = :disciplineSubject,
    @disciplina = :disciplines,
    @palavraChave = :keyword,
    @transitoConteudo = :trafficContent
  `,
  {
    replacements: {
      disciplines,
      disciplineSubject,
      schoolYears,
      isStartYear,
      keyword: searchTerm,
      trafficContent,
    },
    type: sequelize.QueryTypes.SELECT,
  });
};
