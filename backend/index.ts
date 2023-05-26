import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken'
import express, { Express, Request, Response } from 'express';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'Password_123',
  database : 'ISCAS'
});
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());

app.listen(port, () => {
  console.log(`App working on PORT ${port}`);
})
app.get('/api/getCompanyRegistry', (req, res) => {
  res.json({token: "129381hj12hf"});
});
app.post('/api/authorization/login', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const {login, password} = req.body;
  const token = jwt.sign({
    login, password
  }, 'secretwebtoken')
  const users = [{login: 'biba', password: '123', userId: '1', 
  permissions: [
    'PersonCard_Delete', 'PersonCard_Create',
    'PersonCard_Edit', 'PersonRegistry',
    ]
  }];
  const currUser = users.find((user) => user.login === login && user.password === password);
  if (currUser) {
    res.json({token, userData: {userId: currUser.userId, permissions: currUser.permissions}});
  }
  return res.sendStatus(401);
})

connection.connect(() => {
  console.log('connect ok');
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

app.post('/api/authorization/logout', urlencodedParser, (req, res) => {
  return res.sendStatus(200);
})