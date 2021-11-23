const mapItems =
  (t: any) =>
    ({ link, label, target }) => ({
      label: t(`components:${label}`),
      link,
      target
    });

const mapFooterNavigationItems =
  (t: any) =>
    ({ items, title, target }) => ({
      items: items.map(mapItems(t)),
      title: t(`components:${title}`),
      target: target || '_self'
    });

export default mapFooterNavigationItems;
