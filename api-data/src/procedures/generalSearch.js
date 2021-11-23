import sequelize from 'sequelize';

import db from '../config/database';

/**
  @categories STRING =  (all, actions, courses, projects, projectActions),
  @keyword STRING,
  @endDate DATE,
  @startDate DATE,
*/
export default (payload) => {
  const {
    categories = 'all',
    endDate = null,
    keyword,
    startDate = null,
  } = payload;

  let searchTerm = '""';
  if (keyword) {
    searchTerm = `"*${keyword.split(' ').filter(key => !!key.trim()).join('*" OR "*')}*"`;
  }

  return db.query(`EXEC [dnit].[spr_buscaGeral]
    @keywords = :keyword,
    @category = :categories,
    @startDate = :startDate,
    @endDate = :endDate
  `,
  {
    replacements: {
      categories,
      endDate,
      keyword: searchTerm,
      startDate,
    },
    type: sequelize.QueryTypes.SELECT,
  });
};
