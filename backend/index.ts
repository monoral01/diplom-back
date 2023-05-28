import jwt from 'jsonwebtoken'
import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { userDataBaseService } from './src/database/userDataBaseService';
import { companyDataBaseService } from './src/database/companyDataBaseService';
import { personDataBaseService } from './src/database/personDataBaseService';
import mysql from 'mysql2';
import { UserEntity } from './src/models/UserEntity';

dotenv.config();
const pool = mysql.createPool({
  host     : process.env.DB_HOST ?? 'localhost',
  user     : process.env.DB_USER ?? 'admin',
  password : process.env.DB_PASSWORD ?? 'Password_123',
  database : process.env.DB ?? 'ISCAS'
}).promise();

const port = process.env.PORT || 8081;

const app = express();

app.use(express.json());

const urlencodedParser = express.urlencoded({ extended: false });

const userService = userDataBaseService(pool);
const personService = personDataBaseService(pool);
const companyService = companyDataBaseService(pool);

const startApp = async () => {
  try {
    app.listen(port, () => {
      console.log(`App working on PORT ${port}`);
    })
  }
  catch {
    console.log('Some error occured...')
  }
}

startApp();

app
  // получение реестра пользователей
  .get("/api/user/registry", async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.status(200).send(users.map((user) => ({id: user.id, fio: user.fio, createDate: user.createDate})));
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  .get("/api/user/permissions", async (req, res) => {
    try {
      const permissions = await userService.getPermissions();
      res.status(200).send(permissions);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // добавление пользователя
  .post("/api/user", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const userData: UserEntity = req.body;
    try {
      const candidateUser = await userService.getUserByLogin(userData.userLogin).catch(err => console.log(err));
      if (candidateUser) {
        throw 'Учётная запись с таким логином уже существует';
      }
      await userService.insertUser(userData).catch(err => console.log(err));
      res.sendStatus(201);
    }
    catch (err) {
      console.log(err);
      res.status(400).send({message: err});
    }
  })
  // изменение пользователя
  .put("/api/user", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const userData = req.body;
    try {
      const dbResult = await userService.updateUser(userData).catch(err => console.log(err));
      res.status(200).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // вход в систему
  .post("/api/user/login", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const { userLogin, userPassword } = req.body;
    try {
      const candidateUser = await userService.getUserByLogin(userLogin).catch(err => console.log(err));
      if (candidateUser) {
        // сравнение паролей с помощью шифрования bcrypt
        console.log(userPassword, candidateUser.userPassword);
        const passwordResult = bcrypt.compareSync(userPassword, candidateUser.userPassword);
        if (passwordResult) {
          const userPermissions = await userService.getUserPermissions(+candidateUser.id);
          // токен выдаётся на час, затем срок его действия истекает
          const token = jwt.sign({userLogin: candidateUser.userLogin, uuid: candidateUser.uuid}, process.env.JWT_KEY, {expiresIn: 10});
          res.status(200).send({token, fio: candidateUser.fio, permissions: userPermissions});
        }
        else {
          res.status(401).send({message: 'Логин или пароль неверный, попробуйте снова'});
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
    // выход из системы
    .post("/api/user/logout", urlencodedParser, async (req, res) => {
      console.log(req.body);
      try {
        res.sendStatus(200);
      }
      catch (err) {
        res.sendStatus(400);
      }
    })
  // получение пользователя по id
  .get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserByID(+id);
      res.status(200).send(user);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // удаление пользователя по id
  .delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.deleteUser(+id);
      res.status(200).send(user);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  });

app
  // реестр компаний
  .get("/api/company/registry", async (req, res) => {
    try {
      const companies = await companyService.getCompanies();
      res.status(200).send(companies);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // добавление компании
  .post("/api/company", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const companyData = req.body;
    try {
      const dbResult = await companyService.insertCompany(companyData).catch(err => console.log(err));
      res.status(201).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // изменение компании
  .put("/api/company", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const companyData = req.body;
    try {
      const dbResult = await companyService.updateCompany(companyData).catch(err => console.log(err));
      res.status(200).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // получение компании по id
  .get("/api/company/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const company = await companyService.getCompanyByID(+id);
      res.status(200).send(company);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // удаление компании по id
  .delete("/api/company/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const company = await companyService.deleteCompany(+id);
      res.status(200).send(company);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  });

app
  // реестр физ.лиц
  .get("/api/person/registry", async (req, res) => {
    try {
      const persons = await personService.getPersons();
      res.status(200).send(persons);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // добавление физ.лица
  .post("/api/person", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const personData = req.body;
    try {
      const dbResult = await personService.insertPerson(personData).catch(err => console.log(err));
      res.status(201).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // изменение физ.лица
  .put("/api/person", urlencodedParser, async (req, res) => {
    console.log(req.body);
    const personData = req.body;
    try {
      const dbResult = await personService.updatePerson(personData).catch(err => console.log(err));
      res.status(200).send(dbResult[0].insertId);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // получение физ.лица по id
  .get("/api/person/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const person = await personService.getPersonByID(+id);
      res.status(200).send(person);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  })
  // удаление физ.лица по id
  .delete("/api/person/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const person = await personService.deletePerson(+id);
      res.status(200).send(person);
    }
    catch (err) {
      console.log(err);
      res.status(400);
    }
  });