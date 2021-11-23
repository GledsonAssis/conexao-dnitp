const getTypeActivity = () => [
  {
    value: '1',
    title: 'pages:Reports.Survey.Labels.TypeActivity.activity',
  },
  {
    value: '2',
    title: 'pages:Reports.Survey.Labels.TypeActivity.locale',
  },
  {
    value: '3',
    title: 'pages:Reports.Survey.Labels.TypeActivity.question',
  },
];

const getTypeProject = () => [
  {
    value: false,
    title: 'Salvo',
  },
  {
    value: true,
    title: 'Publicado',
  },
];

const getTypeInteractivity = () => [
  {
    value: '1',
    title: 'Classificação',
  },
  {
    value: '2',
    title: 'Comentário',
  },
];

const getPeriod = () => [
  {
    value: '0',
    defaultChecked: true,
    id: '0',
    title: 'general:Period.any'
  },
  {
    value: '07',
    defaultChecked: false,
    id: '07',
    title: 'general:Period.last7days',
  },
  {
    value: '30',
    defaultChecked: false,
    id: '30',
    title: 'general:Period.last30days',
  },
  {
    value: '365',
    defaultChecked: false,
    id: '365',
    title: 'general:Period.lastYear',
  },
  {
    value: 'O',
    defaultChecked: false,
    id: 'O',
    title: 'general:Period.other',
  },
];

const getCategoryProjects = () => [
  {
    value: '1',
    title: 'Projetos',
  },
  {
    value: '2',
    title: 'Ações',
  },
];

const getCategoryInteractivity = () => [
  {
    value: '1',
    title: 'Ações de Ativação',
  },
  {
    title: 'Ações de Projeto ou Campanha',
    value: '2',
  },
  {
    title: 'Cursos',
    value: '3',
  },
  {
    value: '4',
    title: 'Projetos e Campanhas',
  },
];

const getSituationActivity = () => [
  {
    value: '1',
    title: 'Pendente',
  },
  {
    title: 'Avaliado',
    value: '2',
  }
];

export {
  getTypeActivity,
  getTypeProject,
  getTypeInteractivity,
  getPeriod,
  getCategoryProjects,
  getCategoryInteractivity,
  getSituationActivity,
};
