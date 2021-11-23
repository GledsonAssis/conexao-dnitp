import SubTheme from '../../models/general/SubTheme';
import Theme from '../../models/general/Theme';

const activitySubThemeAttributes = [
  'id',
  'idActivityTheme',
  'name',
];

const findAll = () => SubTheme.findAll({
  attributes: activitySubThemeAttributes,
});

const findById = id => SubTheme.findByPk(id, {
  include: [{ as: 'theme', model: Theme }],
  attributes: activitySubThemeAttributes,
});

const findAllCMS = ({
  limit,
  offset,
}) => SubTheme.findAndCountAll({
  attributes: activitySubThemeAttributes,
  limit,
  offset,
});

const findAllByTheme = idActivityTheme => SubTheme.findAndCountAll({
  attributes: ['id', 'name'],
  where: {
    idActivityTheme,
  },
});

export default {
  findAll,
  findAllByTheme,
  findAllCMS,
  findById,
};
