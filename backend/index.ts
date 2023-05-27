import jwt from 'jsonwebtoken'
import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// import mysql from 'mysql2';
// import dayjs from 'dayjs';
// import { CompanyCardState } from '@/models/CompanyEntity';
// import { UserEntity } from '@/models/UserEntity';
// import { formatToDB } from '@/utils/utils';
// import { randomUUID } from 'node:crypto';
// import { PoolConnection } from 'mysql2/promise';
import { userDataBaseService } from './database';

dotenv.config();
const port = process.env.PORT || 8081;

const app = express();

app.use(express.json());

const urlencodedParser = express.urlencoded({ extended: false });

const startApp = async () => {
  try {
    app.listen(port, () => {
      console.log(`App working on PORT ${port}`);
    })
  }
  catch {
    console.log('some error occured...')
  }
}

startApp();

app
  .post("/api/user", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const userData = req.body;
    try {
      const dbResult = await userDataBaseService.insertUser(userData).catch(err => console.log(err));
      res.status(201).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  .post("/api/user/login", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const { userLogin, userPassword } = req.body;
    try {
      const candidateUser = await userDataBaseService.getUserByLogin(userLogin).catch(err => console.log(err));
      if (candidateUser) {
        const passwordResult = bcrypt.compareSync(userPassword, candidateUser.userPassword);
        if (passwordResult) {
          const userPermissions = await userDataBaseService.getUserPermissions(+candidateUser.id);
          const token = jwt.sign({userLogin: candidateUser.userLogin, uuid: candidateUser.uuid}, '', {expiresIn: 3600});
          res.status(200).send({token, userData: candidateUser.fio, permissions: userPermissions});
        }
        else {
          res.status(401).send({message: 'Пароль не совпадает, попробуйте снова'});
        }
      }
      else {
        res.status(404).send({ message: 'Пользователь с таким логином не найден' });
      }
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  .put("/api/user", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const userData = req.body;
    try {
      const dbResult = await userDataBaseService.updateUser(userData).catch(err => console.log(err));
      res.status(201).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  .get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userDataBaseService.getUserByID(+id);
      res.status(200).send(user);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  });

app.post("/api/user", urlencodedParser, async (req, res) => {
  console.log(req.body);
  const userData = req.body;
  try {
    const dbResult = await userDataBaseService.insertUser(userData).catch(err => console.log(err));
    res.status(201).send(dbResult[0].insertId);
  }
  catch (err) {
    console.log(err);
    res.status(400);
  }
})
app.get("/user/registry", async (req, res) => {
  const users = await userDataBaseService.getUsers();
  res.status(201).send(users);
  // res.send(notes)
})

