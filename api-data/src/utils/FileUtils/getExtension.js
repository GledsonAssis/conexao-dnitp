const fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;

export default filename => filename.match(fileExtensionPattern)[0];
