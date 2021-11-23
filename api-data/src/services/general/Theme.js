import Theme from '../../models/general/Theme';
import SubTheme from '../../models/general/SubTheme';

const activityThemeAttributes = [
  'id',
  'name',
];

const findAll = () => Theme.findAll({
  attributes: activityThemeAttributes,
});

const findById = id => Theme.findByPk(id, {
  attributes: activityThemeAttributes,
  include: [{
    as: 'subtheme',
    attributes: [
      'id',
      'name',
    ],
    model: SubTheme,
  }],
  where: {
    id,
  },
});

const findAllCMS = ({ offset, limit }) => Theme.findAndCountAll({
  attributes: activityThemeAttributes,
  limit,
  offset,
});

export default {
  findAll,
  findAllCMS,
  findById,
};
