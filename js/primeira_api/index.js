const express = require("express");

const app = new express();

app.use(express.json());

var contador_id = 1;
var data = [{
    id: 1,
    nome: "Pedro",
    cpf: "99999999999",
    status: true
}];

app.get("/listar", (request, response) => {
    return response.send(data);
});

app.get("/listar/:id", (request, response) => {

    const { id } = request.params;

    const pessoa = data.filter((item) => {
        return item.id == id

    });

    if (pessoa.length == 0) {
        return response.status(400).send({
            msg: "Pessoa não encontrada!"
        });
    }

    return response.send(pessoa[0]);
});

app.post("/cadastrar", (request, response) => {
    //const nome = request.body.nome;
    //const cpf = request.body.cpf;
    //const status = request.body.status; 

    const { nome, cpf, status } = request.body;

    //console.log('DADOS DA PESSOA');
    //console.log(nome);
    //console.log(cpf);
    //console.log(status); 
    if (nome == undefined) {
        return response.status(300).send({
            msg: "O campo NOME é obrigatório!"
        });
    } else if (cpf == undefined) {
        return response.status(300).send({
            msg: "O campo CPF é obrigatório!"
        });
    }

    contador_id++;

    data.push({ id: contador_id, nome, cpf, status });

    return response.send("Pessoa cadastrada com sucesso!");
});

app.delete("/deletar/:id", (request, response) => {
    const { id } = request.params;

    data = data.map((item) => {
        return item.id != id
    });

    return response.send("Pessoa deletada com sucesso!");
});

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080!");
});