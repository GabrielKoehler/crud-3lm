module.exports = app => {
    const cargo = require("../controllers/cargo.controller.js");
  
    var router = require("express").Router();
  
    // Cria um novo cargo
    router.post("/new", cargo.create);
  
    // Recupera todos os cargos
    router.get("/", cargo.findAll);
    
    // Recupera o cargo pelo id
    router.get("/:id", cargo.findOne);
  
    // Atualiza o cargo pelo id
    router.put("/:id", cargo.update);
  
    // Remove o cargo pelo id
    router.delete("/:id", cargo.delete);
  
    // Remove todos os cargos
    router.delete("/", cargo.deleteAll);
  
    app.use('/cargo', router);
  };
  