export default (list, name) => {
  let file = null;

  if (list[0]) {
    file = [];
    const keys = Object.keys(list[0]);
    file.push(`${Object.keys(list[0]).join(';')}`);

    file.push(`${list.map(row => keys
      .map(key => String(row[key])
        // eslint-disable-next-line no-control-regex
        .replace(new RegExp('\r?\n', 'g'), ' ')
        .replace(new RegExp(';', 'g'), ',').trim())
      .join(';'))
      .map(el => el.trim())
      .join(';\n')};\n`);

    file = `${file.join(';\n')}`;
  }

  return {
    file,
    mime: {
      media: 'text/csv; charset=iso-8859-1',
      suffix: '.csv',
    },
    name,
  };
};
