module.exports = app => {
    const funcionario = require("../controllers/funcionario.controller.js");
  
    var router = require("express").Router();
  
    // Cria um novo funcionario
    router.post("/new", funcionario.create);
  
    // Recupera todos os funcionario
    router.get("/", funcionario.findAll);
    
    // Recupera o funcionario pelo id
    router.get("/:id", funcionario.findOne);
  
    // Atualiza o funcionario pelo id
    router.put("/:id", funcionario.update);
  
    // Remove o funcionario pelo id
    router.delete("/:id", funcionario.delete);
  
    // Remove todos os funcionario
    router.delete("/", funcionario.deleteAll);
  
    app.use('/funcionario', router);
  };
  