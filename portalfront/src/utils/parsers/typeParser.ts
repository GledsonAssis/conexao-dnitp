const typeParser = (type) => {
  switch (type) {
    case 'Curso':
      return 'courses';
    case 'Atividade':
      return 'activities';
    case 'Projeto':
      return 'projects';
    case 'Link Externo':
      return 'external/link';
    case 'Ação de Projeto':
      return 'projects/actions';
    case 'Ação de Ativação':
      return 'actions';
    case 'Prática':
      return '';
    default:
      return '';
  }
};

export default typeParser;
