export const sortOptionsParser =
  (t: (arg0: any) => any) =>
    ({ value, label, field, order }) => ({
      value,
      label: t(label),
      field,
      order
    });

export default sortOptionsParser;
