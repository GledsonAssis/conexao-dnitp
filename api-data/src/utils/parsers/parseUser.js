export default ({
  educationalInstitution,
  schoolBonds,
  ...rest
}) => ({
  educationalInstitution: {
    id: null,
    ...educationalInstitution,
  },
  schoolBonds: {
    id: null,
    ...schoolBonds,
  },
  ...rest,
});
