const LoginUnico = require('../Modulos/LoginUnico');

module.exports = (app) => {
    app.get('/auth/token', LoginUnico.getToken);
    app.get('/auth/token/refresh', LoginUnico.refreshToken);
    app.get('/auth/user', LoginUnico.getUserInfo);
    app.get('/getPicture', LoginUnico.getPicture);
}