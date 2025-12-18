
import express from 'express';
import fs from 'fs';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function readData() {
  return JSON.parse(fs.readFileSync("db.json", "utf-8"));
}

function writeData(data) {
  fs.writeFileSync("db.json", JSON.stringify(data));
}

app.get('/', (req, res) => {
  const data = readData();

  res.render('Main', {
    title: "Express Test Title",
    name: "Kimia Pirayesh Nezhad 22",
    subtitle: "Amoot Soft",
    data
  });
});

app.get('/todos', (req, res) => {
  const data = readData();
  res.json(data.todos);
});


app.patch('/todos/:id/:checked', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
   const checked = req.params.checked;

  const todo = data.todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  let checkedFormat = checked === 'true';
  todo.isChecked = checkedFormat;

  console.log(todo,checkedFormat,checked);
  writeData(data);

  res.json({ ok: true });
});

app.listen(port, () => {
  console.log('App Is Running on', port);
});
