import { UserEntity } from './src/models/UserEntity';
import { formatFromDB, formatToDB } from './src/utils/utils';
import dayjs from 'dayjs';
import mysql from 'mysql2';
import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';
  
  dotenv.config();
  const pool = mysql.createPool({
    host     : process.env.DB_HOST ?? 'localhost',
    user     : process.env.DB_USER ?? 'admin',
    password : process.env.DB_PASSWORD ?? 'Password_123',
    database : process.env.DB ?? 'ISCAS_test'
  }).promise();

  const getUsers = async () => {
    const [data] = await pool.query('SELECT * FROM users');
    return data as UserEntity[];
   }
   
  const getUserByID = async (id: number) => {
     const [data] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
     return formatFromDB(data[0]) as UserEntity;
   }

   const getUserByLogin = async (userLogin: string) => {
    const [data] = await pool.query(`SELECT * FROM users WHERE user_login = ?`, [userLogin]);
    return formatFromDB(data[0]) as UserEntity;
   }

  const insertUser = async (data: UserEntity) => {
     const newData = formatToDB({uuid: randomUUID(), userLogin: data.userLogin, 
       userPassword: data.userPassword, createDate: dayjs().format('YYYY-MM-DD'), fio: data.fio });
     const values = Object.values(newData);
     const fields = Object.keys(newData).join(', ');
     const result = await pool.query(`INSERT INTO users (${fields}) 
       VALUES (?, ?, ?, ?, ?)`, values).catch((err) => console.log(err));
     return result;
   }

  const updateUser = async (data: UserEntity) => {
    const newData = formatToDB({uuid: randomUUID(), userLogin: data.userLogin, 
      userPassword: data.userPassword, createDate: dayjs().format('YYYY-MM-DD'), fio: data.fio });
    const values = Object.values(newData);
    const fields = Object.keys(newData).join(', ');
    const result = await pool.query(`UPDATE users (${fields}) 
      VALUES (?, ?, ?, ?, ?)`, values).catch((err) => console.log(err));
    return result;
  }
  const getUserPermissions = async (userId: number) => {
    const permissions = await pool.query(`SELECT permissions.* 
     FROM permissions   
      INNER JOIN permissions_users 
         ON permissions.id = permissions_users.permission_id 
     WHERE permissions_users.user_id = ${userId};`);
     console.log(permissions);
     return permissions;
  }
export const userDataBaseService = {getUsers, getUserByID, getUserByLogin, insertUser, updateUser, getUserPermissions}