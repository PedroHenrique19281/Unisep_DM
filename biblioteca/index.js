import express from "express";
import knex from "knex";

const app = new express();
const mySql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "Pedro191007.",
        database: "biblioteca"
    }
});


async function testaConexaoComBancoDeDados() {
    try {
        await mySql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

app.use(express.json());

app.listen(8080, () => {
    console.log("O sevidor está rodando na porta 8080!");
});

app.get("/listar", async (req, res) => {
    const livros = await mySql.raw(" SELECT * FROM livros");     

    res.send(livros[0]);
})

app.post("/cadastrar", async (req, res)=> {
    const {titulo, autor,editora, qtde, preco} = req.body;
    const livros = await mySql.raw("INSERT INTO livros(TITULO, AUTOR, EDITORA, QTDE, PRECO) VALUES(?,?,?,?,?)", [titulo, autor, editora, qtde, preco]);
   
    var msg = "Livro cadastrado com sucesso!";
    res.send(msg);
}
);

app.put("/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editora, qtde, preco } = req.body;

  await mySql.raw(
    `UPDATE livros
     SET titulo = ?,
         autor = ?,
         editora = ?,
         qtde = ?,
         preco = ?
     WHERE id = ?`,
    [titulo, autor, editora, qtde, preco, id]
  );

  res.send("Livro atualizado com sucesso!");
});

app.delete("/deletar/:id", async (req, res) => {
    const { id } = req.params;
    await mySql.raw("DELETE FROM livros WHERE id = ?", [id]);  
    res.send("Livro deletado com sucesso!");
})

app.get("/listar/:id", async (req, res) => {
    const { id } = req.params;
    const livros = await mySql.raw(" SELECT * FROM livros WHERE ID = ?", [id]);
    res.send(livros[0]);
});