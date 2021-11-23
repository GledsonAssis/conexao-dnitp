const extractColor = ({ color }) => color || 'a80000';

export default (activity) => {
  const target = {
    discipline: {
      name: undefined,
    },
    schoolYear: {
      color: undefined,
      ordinal: undefined,
    },
    tittle: undefined,
  };

  const {
    discipline: { name: discipline },
    schoolYear: { year },
    ...rest
  } = activity;

  const parsed = Object.assign(target, {
    ...rest,
    headerColor: extractColor(activity.schoolYear),
    headerLabel: year.toString(),
    subtitle: discipline,
  });

  return parsed;
};
