import express from 'express';
import knex from 'knex';

const mysql = knex({
    client: 'mysql2',
    connection: {
        host: "localhost",
        user: "root",
        password: "Pedro191007.",
        database: "mercado"
    }
})

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

const app = new express();

app.use(express.json());

app.get("/listar", async (req, res)=>{

    const produtos = await mysql.select("*").from("produto");  

    res.send(produtos);

});

app.get("/listar/:id", async (req, res)=>{

    const { id } = req.params;

    const produto = await mysql.select("*")
        .from("produto")
        .where({ id : id});

    res.send(produto);

});

app.post("/cadastrar", async (req, res)=>{

    const { nome, preco, qtd_estoque } = req.body;

    const produto = await mysql("produto").insert({
        nome,
        preco,
        qtd_estoque
    }).into("produto");

    res.send({msg : `Produto ${nome} cadastrado com sucesso!`});
});

app.put("/atualizar", async (req, res)=>{
    const {id, nome, preco, qtd_estoque} = req.body;

    const produto = await mysql('produto')
        .where({ id })
        .update({
            nome,
            preco,
            qtd_estoque
        });

    res.send({msg: "produto atualizado com sucesso!"});
});

app.listen(8080, ()=>{
    console.log("O servidor está rodando na porta 8080");
});