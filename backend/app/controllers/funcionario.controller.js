const db = require("../models");
const Funcionario = db.funcionario;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.nome) {
    res.status(400).send({
      message: "Não é possível adicionar um funcionário sem nome."
    });
    return;
  }
  if (!req.body.sobrenome) {
    res.status(400).send({
      message: "Não é possível adicionar um funcionário sem sobrenome."
    });
    return;
  }
  if (!req.body.dataNascimento) {
    res.status(400).send({
      message: "Não é possível adicionar um funcionário sem a data de nascimento."
    });
    return;
  }
  if (!req.body.salario) {
    res.status(400).send({
      message: "Não é possível adicionar um funcionário sem o seu salário."
    });
    return;
  }



  const funcionario = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    dataNascimento: req.body.dataNascimento,
    salario: req.body.salario,
    cargoId: req.body.cargoId
  };

  Funcionario.create(funcionario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreram erros ao criar um funcionário."
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Funcionario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao recuperar funcionários."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Funcionario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar recuperar o funcionário com o id: ${id}.` 
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Funcionario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Informações do funcionário atualizadas."
        });
      } else {
        res.send({
          message: "Não foi possível atualizar as informações do funcionário." 
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar atualizar o funcionário com o id: ${id}.` 
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Funcionario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Funcionário removido!"
        });
      } else {
        res.send({
          message: "Não foi possível remover o funcionário." 
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar remover o funcionário com o id: ${id}.`
      });
    });
};

exports.deleteAll = (req, res) => {
  Funcionario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Um total de ${nums} funcionário(s) foram removido(s)!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao tentar remover o(s) funcionário(s)."
      });
    });
};
