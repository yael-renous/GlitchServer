import express from 'express';
import {Low} from 'lowdb';
import { JSONFile } from 'lowdb/node';

let app = express();
app.use(express.json());

let port= process.env.PORT || 3000;

const defaultData = {
  lines: [
    {
      text: "Once upon a time",
      color: "green"

    },
  ]
};

const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);



app.post('/new-data', (request, response) => {
  console.log("adding new data");
  const { text, color } = request.body;
  db.data.lines.push({ text, color });
  db.write().then(() => {
    console.log("added" + db.data);
    response.json({ task: 'success' });
  });
});

app.get('/data', (request, response) => {
  console.log("getting data");
  db.read().then(() => {
    let obj = {lines: db.data.lines};
    response.json(obj);
  });
});


app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});