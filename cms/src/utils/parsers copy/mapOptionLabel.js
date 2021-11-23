export default (t) => (item) => ({
  ...item,
  label: t(item.label),
});
