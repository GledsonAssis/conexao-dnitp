const getPathName = (item: any) => {
  switch (item.type) {
    case 'actions':
      return `acoes/${item.id}`;
    case 'activities':
      return `atividades/${item.id}`;
    case 'projects':
      return `projetos/${item.id}`;
    case 'courses':
      return `cursos/${item.id}`;
    case 'projectActions':
    case 'projects/actions':
      return `projetos/${item.extra}/acoes/${item.id}`;
    default:
      return '';
  }
};

export default getPathName;
