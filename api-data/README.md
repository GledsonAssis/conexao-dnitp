<div style="text-align: center;">
<a href="https://www.labtrans.ufsc.br/">
<img style="height: 60px;" alt="Labtrans-Logo" src="./docs/images/LabTrans.png" float="center"/>
</a><br/><br/>
</div>

# API de dados - LabTrans

Serviço de API de dados do projeto Conexão DNIT.

## :triangular_flag_on_post: Iniciando

### **- Dependencias:**

- Node: 14.15.0
- Docker: 20.10.2
- npm: 6.14.0
- git: 2.28.0.windows.1

### **- Instalação:**

Clone o repositório no local desejado e abra o local do projeto no seu terminal. Em seguida, execute os seguintes comandos:

```powershell
# Copiar as variáveis de ambiente
$ cp .env.development .env # (Para ambiente de desenvolvimento)

# Instalar dependências
$ npm i

# Executar o projeto
$ npm start
```

Os endpoints estarão disponíveis em <http://localhost:7001>.


## :ledger: Descrição

Serviço de autenticação no sistema do GovBR com retorno de informações do usuário, tais como: cnpj, email, telefone, foto. É possível ainda gerar um token de autenticação com expiração de 2 horas.

## :hammer: ToDo

- [ ] Documentação técnica utilizando swagger
- [ ] Utilização de TypeScript e refatoração utilizando DDD e Clean Architecture

## :bust_in_silhouette: Autor

**STIGeo**

### **Projeto Mantido por:**

<div style="text-align: center; align-items: top;">
<a href="https://www.labtrans.ufsc.br/">
<img style="height: 40px; margin-right: 20px" alt="Labtrans-Logo" src="./docs/images/LabTrans.png" float="center"/>
</a>
<a href="https://www.gov.br/dnit/pt-br">
<img style="height: 40px;" alt="IOUU-Logo" src="./docs/images/dnit.png" float="center"/>
</a>
<br/><br/>
</div>

---

This README was generated with ♥ by **Gledson**
<!-- ### Tecnologias e ferramentas

* [NodeJS](https://nodejs.org/en/)
* GIT
* Javascript
* Libraries: 
  * [CORS](https://github.com/expressjs/cors)
  * [Express](https://expressjs.com/pt-br/)
  * [Joi](https://github.com/hapijs/joi)
  * [PM2](http://pm2.keymetrics.io/)
  * [Sequelize](http://docs.sequelizejs.com/)
  * [Tedious](https://github.com/tediousjs/tedious)
* Ferramentas: 
  * [Babel](https://babeljs.io/)
  * [dotENV](https://github.com/motdotla/dotenv)
  * [ESLint](https://eslint.org/)
  * [Yarn](https://yarnpkg.com/en/)
  * [VSCode IDE](https://code.visualstudio.com/)

 ### Execução

#### Environments

* Crie o arquivo no diretório raiz da aplicação:
  * .env
  
#### Enviroment Variables
  
	APP_PORT=7001
	APP_LIMIT_REQUEST_SIZE='10mb'

	AUTH_API__AUTHORIZATION_TOKEN='Basic YXBpLWRhdGE6c2VjcmV0'
	AUTH_API__URL='https://conexao-dnit-dev.labtrans.ufsc.br/auth'

	DB_INSTANCE=devweb2012
	DB_NAME=bd_dnit_observatorio_workbranch_<VERIFICAR VERSÃO DA BASE DE DADOS>
	DB_PASSWORD=<VERIFICAR SENHA COM A EQUIPE>
	DB_PORT=1433
	DB_SERVER=db-stigeo-dev12.labtrans.ufsc.br
	DB_USERNAME=observatorio

#### Desenvolvimento

Para rodar este projeto você deve ter [NodeJS](https://nodejs.org) [(v.8.11.3)](https://nodejs.org/en/), [Yarn](https://yarnpkg.com) (v.1.5.1) e [GIT](https://git-scm.com) instalados;
* Crie os arquivos no diretório raiz da aplicação:
    * .env 
    * localhost.cert
    * localhost.key
        * Gerar o certificado e a chave utilizando o serviço [Self-Signed Certificate Generator](http://www.selfsignedcertificate.com/)
            1. Digitar **localhost** no campo **Server name**
            2. Clicar em **Generate**
            3. Renomear os dois arquivos para **localhost.cert** e **localhost.key**, respectivamente.

* Rode os comandos yarn:

```bash
# Baixa as dependências do projeto
$ yarn install

#  Inicia a aplicação
$ yarn start


#### Registry

As imagens são enviadas para um container registry do projeto. -->