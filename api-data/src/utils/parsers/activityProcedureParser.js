export default ({
  id,
  corHexa,
  disciplina,
  numeroOrdinal,
  tituloAtividade,
}) => ({
  id,
  discipline: {
    name: disciplina,
  },
  schoolYear: {
    color: corHexa,
    year: numeroOrdinal,
  },
  title: tituloAtividade,
});
