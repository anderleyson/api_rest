const User = require('../models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController{

   
    show(req, res){
        var users = ["Kaio","Larissa", "Denver"]

        return res.status(200).json({
            error: false, 
            users
        })
    }
    async store(req, res){

        let schema = yup.object().shape({

            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true, 
                    message: "Dados inválidos"
            });
        }

        let emailExist = await User.findOne({ email: req.body.email })
        if(emailExist){
            return res.status(400).json({
                error: true,
                message: "Este e-mail já esta cadastrado na base de dados"
            })
        }

        const { name, email, password  } = req.body;
        const dados = {
            name,
            email,
            password
        }
        dados.password = await bcrypt.hash(dados.password, 8);
        await User.create(dados, (err) => {
            if(err)
                return res.status(400).json({
                    error: true, 
                    message: "Erro ao tentar inserir usuário no banco"
                })
            return res.status(200).json({
                error:false,
                message: "Usuário cadastrado com sucesso"
            })
        })
    }

}

module.exports = new UserController();