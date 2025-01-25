const express = require('express'); // para importar o express
const app = express(); // criar o app
const PORT = 3000; // define a porta do servidor

app.use(express.json());

let tarefas = [
    { id: 1, titulo: 'Aprender Node.js', concluida: false},
    { id: 2, titulo: 'Estudar APIs REST', concluida: false},
];

// rota para listar todas as tarefas que existem
app.get('/tarefas', (req,res) => {
    res.json(tarefas);
});

// rota para criar uma nova tarefa
app.get('/tarefas', (req,res) => {
    const novaTarefa = req.body;
    novaTarefa.id = tarefas.length + 1; // gera um novo id
    tarefas.push(novaTarefa);
    res,status(201).json(novaTarefa); // retorna a nova tarefa criada
});

// rota para atualizar uma tarefa pelo ID
app.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefaIndex = tarefas.findIndex((t) => t.id === id);

    if (tarefaIndex >= 0){
        tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...req.body};
        res.json(tarefas[tarefaIndex]);
    } else{
        res.status(404).json({ mensagem: 'Tarefa não encontrada'});
    }
});

//rota para deletar uma tarefa pelo ID
app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefaIndex = tarefas.findIndex((t) => t.id === id);
  
    if (tarefaIndex >= 0) {
      tarefas.splice(tarefaIndex, 1);
      res.json({ mensagem: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
  });

  // inicia o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
