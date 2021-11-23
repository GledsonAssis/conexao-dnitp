<div style="text-align: center;">
<a href="https://www.labtrans.ufsc.br/">
<img style="height: 60px;" alt="IOUU-Logo" src="./docs/images/LabTrans.png" float="center"/>
</a><br/><br/>
</div>

# Login único GovBr - LabTrans 

Serviço de acesso único com comunicação com o GovBr e desenvolvido em JavaScript.

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
cp .env.development .env # (Para ambiente de desenvolvimento)

# Instalar dependências
npm i

# Executar o projeto
npm start
```

Os endpoints estarão disponíveis em <http://localhost:7003>.

## :ledger: Descrição

Serviço de autenticação no sistema do GovBR com retorno de informações do usuário, tais como: cnpj, email, telefone, foto. É possível ainda gerar um token de autenticação com expiração de 2 horas.

## :hammer: ToDo

- [ ] Documentação técnica utilizando swagger
- [ ] Utilização de TypeScript e refatoração utilizando DDD e Clean Architecture

## :bust_in_silhouette: Autor

**Daniel e [Gledson Assis](https://github.com/GledsonAssis)**

---

This README was generated with ♥ by **Gledson**
