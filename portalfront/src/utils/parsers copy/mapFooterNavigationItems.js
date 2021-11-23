const mapItems =
  (t) =>
  ({ link, label }) => ({
    label: t(label),
    link,
  });

export default (t) =>
  ({ items, title }) => ({
    items: items.map(mapItems(t)),
    title: t(title),
  });
