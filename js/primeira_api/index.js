const express = require("express");

const app = new express();

app.use(express.json());

let contador_id = 1;

var data = [{
    id: 1,
    nome: "Guilherme",
    cpf: "123456789",
    status: true
}];


app.get("/listar", (request, response)=>{
    return response.send(data);
});

app.get("/listar/:id", (request, response)=>{
    const { id } = request.params;

    const pessoa = data.filter((item) => {
        return item.id == id
    });

    if (pessoa.length == 0) {
        response.status(400).send({
            msg: "Pessoa do código " + id + " não encontrada"
        });
    }

    response.send(pessoa);  

});

app.post("/cadastrar", (request, response) =>{
    const {nome, cpf, status} = request.body;

    if (!nome){
        return response.status(300).send("O campo NOME é obrigatório");
    } else if (!cpf){
        return response.status(300).send("O campo CPF é obrigatório");
    }

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso!")
});

app.delete("/deletar/:id", (request, response) =>{
    const {id} = request.params;

    const indice = data.findIndex((item) => {
        return item.id == id
    });

    if (indice !== -1){
        data.splice(indice, 1);
    }
    
    response.send(data);

})

app.put("/atualizar", (request, response)=>{
    const {id, nome, cpf, status} = request.body;

    const IndicePessoa = data.findIndex((item) => {
        return item.id == id;
    });

    if (!id){
        return response.status(300).send("O campo ID é obrigatório");
    }

    if (IndicePessoa == -1){
        response.status(400).send("O campo ID não foi encontrado");
    } else {
        data[IndicePessoa].nome = nome;
        data[IndicePessoa].cpf = cpf;
        data[IndicePessoa].status = status;

        response.send(data[IndicePessoa]);
    }
})


app.listen(8080, ()=>{
    console.log("O servidor está rodando na porta 8080")    
});