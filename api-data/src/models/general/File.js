class File {
  constructor(data) {
    this.id = data.id;
    this.idMime = data.idMime;
    this.name = data.nome;
    this.file = data.arquivo;
    this.default = data.principal;
  }
}

export default File;
