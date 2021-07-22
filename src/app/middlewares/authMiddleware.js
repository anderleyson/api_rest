const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const { promisify } = require('util')

module.exports = async (req, res, next) =>{
    const auth = req.headers.authorization;
    if(!auth){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Token não existe"
        })
    }
    const [bearer, token] = auth.split(' ');
    
    try{
        const decode = await promisify(jwt.verify)(token, config.secret);
        if(!decode){
            res.status(401).json({
                error: true,
                message: "Token inválido"
            });
        }else{
            req.user_id = decode.id;
            next();
        }
    }catch {
        res.status(401).json({
            error: true,
            message: "Token inválido"
        });
    }
}