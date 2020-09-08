const db = require("../models");
const Cargo = db.cargo;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.descricao) {
    res.status(400).send({
      message: "Não é possível adicionar um cargo sem descrição."
    });
    return;
  }

  const cargo = {
    descricao: req.body.descricao
  };

  Cargo.create(cargo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreram erros ao criar um cargo"
      });
    });
};

exports.findAll = (req, res) => {
  const descricao = req.query.descricao;
  var condition = descricao ? { descricao: { [Op.like]: `%${descricao}%` } } : null;

  Cargo.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao recuperar cargos."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cargo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar recuperar o cargo com o id: ${id}.`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cargo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Informações do cargo atualizadas."
        });
      } else {
        res.send({
          message: "Não foi possível atualizar as informações do cargo."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar atualizar o cargo com o id: ${id}.`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cargo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cargo removido!"
        });
      } else {
        res.send({
          message: "Não foi possível remover o cargo."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao tentar remover o cargo com o id: ${id}.`
      });
    });
};

exports.deleteAll = (req, res) => {
  Cargo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Um total de ${nums} cargo(s) foram removido(s)!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao tentar remover o(s) cargo(s)."
      });
    });
};
