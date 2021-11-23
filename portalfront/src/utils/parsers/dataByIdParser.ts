const dataByIdParserFunc = ({ dataByIdParser, keyName, value }) => ({
  dataByIdParser: {
    ...dataByIdParser,
    [keyName]: value,
  },
});

export default dataByIdParserFunc;
