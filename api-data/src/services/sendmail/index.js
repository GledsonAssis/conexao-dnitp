const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const templatesDir = path.resolve(__dirname, '../../templates');

const sendMail = (obj) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_SERVER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const filename = path.join(templatesDir, obj.template, 'html.ejs');

  // Codigo de exemplo para montar URL de arquivos estaticos da API
  // let urlLogo = `${process.env.APP_HOST}:${process.env.APP_PORT}/logo_home.png`;
  // if(!urlLogo.includes('http')) {
  //   urlLogo = 'http://' + urlLogo;
  // }

  const urlLogo = 'https://updates.labtrans.ufsc.br/dnit/conexao/logo_home.png';

  const data = {
    name: obj.name,
    title: obj.title,
    url: obj.url,
    gestorName: obj.gestores,
    logo: urlLogo,
  };

  ejs.renderFile(filename, data, {}, (error, str) => {
    const message = {
      from: process.env.MAIL_SENDER,
      to: obj.destinatarios,
      subject: obj.assunto,
      html: str,
    };

    transporter.sendMail(message, (err) => {
      if (err) {
        console.log(`Ocorreu um erro ao enviar mensagens. Detalhes: ${err.message}`);
      }
      return null;
    });
  });
};

export default {
  sendMail,
};
