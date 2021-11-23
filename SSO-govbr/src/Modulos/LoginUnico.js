const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const njwk = require('node-jwk');
const base64 = require('base-64');
const { StatusCodes } = require('http-status-codes');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const expiresTime = +process.env.EXPIRES_IN;
const jwtSecret = process.env.JWT_SECRET;
const provider = 'sso.staging.acesso.gov.br'

async function getJwk() {
    var response = await fetch(`https://${provider}/jwk`);
    var data = await response.json()
    return JSON.stringify(data.keys[0]);
}

async function getPictureIntern(accessToken) {
    const url = `https://${provider}/userinfo/picture`;
    try {
        const govbrres = await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        const buffer = await govbrres.buffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:image/*;base64,${base64}`;
    } catch (error) {
        console.error('[LoginUnico.getPictureIntern]: ', error.message);
        return error;
    };
}

exports.getToken = async (req, res, next) => {
    const code = req.headers['govbr-code'];
    const url =
        `https://${provider}/token?grant_type=authorization_code&code=${code}&redirect_uri=https://${clientId}/`;
    try {
        const govbrres = await fetch(url, {
            method: "post",
            headers: {
                Authorization: `Basic ${base64.encode(`${clientId}:${clientSecret}`)}`
            }
        });
        const data = await govbrres.json();

        if (data.error) {
            console.error('[LoginUnico.getToken]: ', data)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(data);
        }

        const publicKey = await getJwk();
        const publicJwk = njwk.JWK.fromJSON(publicKey);
        data.id_claims = jwt.verify(data.id_token, publicJwk.key.toPublicKeyPEM(), { algorithms: ["RS256"] });
        data.access_claims = jwt.verify(data.access_token, publicJwk.key.toPublicKeyPEM(), { algorithms: ["RS256"] });
        data.picture = await getPictureIntern(data.access_token);
        const access_token = jwt.sign({ data: data.id_claims }, jwtSecret, { expiresIn: `${expiresTime}h` });
        const validateNewToken = jwt.verify(access_token, jwtSecret);
        const response = {
            access_token,
            picture: data.picture,
            expires_in: validateNewToken.exp * 1000
        }
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error('[LoginUnico.getToken]: ', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Authentication failed');
    };
};

exports.getPicture = async (req, res, next) => {
    try {
        const accessToken = req.query.access_token
        const buffer = await getPictureIntern(accessToken);
        return res.status(StatusCodes.OK).json(buffer);
    } catch (error) {
        console.error('[LoginUnico.getPicture]: ', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    };
};

exports.refreshToken = async (req, res, next) => {
    try {
        const validate = jwt.verify(req.headers.authorization, jwtSecret);
        var access_token = jwt.sign({ data: validate.data }, jwtSecret, { expiresIn: `${expiresTime}h` });
        const validateNewToken = jwt.verify(access_token, jwtSecret);
        const response = {
            access_token,
            expires_in: validateNewToken.exp * 1000
        }
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error('[LoginUnico.refreshToken]: ', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    };
};

exports.getUserInfo = async (req, res, next) => {
    try {
        const validate = jwt.verify(req.headers.authorization, jwtSecret);
        var token = jwt.sign({ data: validate.data }, jwtSecret, { expiresIn: `${expiresTime}h` });
        const validateNewToken = jwt.verify(token, jwtSecret);
        const response = {
            user: validate.data,
            new_token: token,
            expires_in: validateNewToken.exp * 1000
        }
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error('[LoginUnico.getUserInfo]: ', error.message);
        return res.status(StatusCodes.FORBIDDEN).json(error);
    };
};
