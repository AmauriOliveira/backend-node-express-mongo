const jsonWT = require('jsonwebtoken');
module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).send({ error: 'Missing authorization token' });
    }
    /* REFATORAR
        const partes = authHeader.split(' ');
    
        if (partes.length !== 2) {
            return response.status(401).send({ error: 'Authorization token error' });
        }
        const [scheme, token] = partes;
    
        if (!/^Bearer$/i.test(scheme)) {
            return response.status(401).send({ error: 'Authorization token malformed' });
        }
    */
    jsonWT.verify(authHeader, process.env.SECRET_MD5, (err, decoded) => {
        if (err) {
            return response.status(401).send({ error: 'Authorization token invalid' });
        }
        request.userID = decoded.id;
        return next();
    });
};