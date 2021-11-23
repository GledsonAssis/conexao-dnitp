import moment from 'moment';

export default ({
  descricaoResumida,
  id,
  idProjeto,
  tipo,
  titulo,
  data,
}) => ({
  description: descricaoResumida,
  id,
  idProject: idProjeto,
  title: titulo,
  type: tipo,
  date: moment(data).tz('Etc/GMT-3'),
});
