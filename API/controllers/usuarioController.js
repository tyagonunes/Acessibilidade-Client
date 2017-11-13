var Usuario = require('../models/usuario');

exports.save = function (nome, senha, callback) {
    Usuario.findOne({'nome':nome}, function(erro, usuario){
        if(erro) {
            callback('Deu erro');
        }else if (usuario){
            callback('Usuario já existe');
        }else {
            var novoUsuario = new Usuario;
            novoUsuario.nome = nome;
            novoUsuario.senha = novoUsuario.gerarSenha(senha);
            novoUsuario.token = novoUsuario.gerarToken(nome, senha);
            novoUsuario.save(function(erro, usuario){
                if(erro) {
                    callback('Erro');
                }else {
                    callback(usuario);
                }
            })
        }
    })
}

exports.login = function(nome, senha, callback) {
    
    Usuario.findOne({'nome':nome}, function(erro, usuario) {
        if(erro) {
            callback('Deu erro')
        }else if (usuario) {
            if(usuario.validarSenha(senha)) {
                callback(usuario.token);    
            }else {
                callback('Senha incorreta')
            }
        }else{
            callback('Usuário inexistente')
        }
    });
}


exports.list = function(token, callback) {
    Usuario.findOne({'token': token}, function(erro, usuario){
        if(erro) {
            callback('Deu erro')
        }else if (usuario) {
            callback(usuario.nome);
        }else {
            callback('Usuário não encontrado');
        }
    });
}