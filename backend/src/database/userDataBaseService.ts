import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { UserEntity } from '../models/UserEntity';
import { formatFromDB, formatToDB } from '../utils/utils';
import bcrypt from 'bcryptjs';

export const userDataBaseService = (pool: any) => ({
  getUsers: async () => {
    const [data] = await pool.query('SELECT * FROM users');
    return (data as UserEntity[]).map(user => formatFromDB(user));
  },
  getUserByID: async (id: number) => {
     const [data] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
     return formatFromDB(data[0]) as UserEntity;
  },
  getUserByLogin: async (userLogin: string) => {
    const [data] = await pool.query(`SELECT * FROM users WHERE user_login = ?`, [userLogin]);
    console.log('data', data);
    return formatFromDB(data[0]) as UserEntity;
  },
  insertUser: async (data: UserEntity) => {
    const saltRounds = 10;
    let result;
    bcrypt.hash(data.userPassword, saltRounds, async function(err, hash) {
      const newData = formatToDB({uuid: randomUUID(), userLogin: data.userLogin, 
        userPassword: hash, createDate: dayjs().format('YYYY-MM-DD'), fio: data.fio });
      const values = Object.values(newData);
      const fields = Object.keys(newData).join(', ');
      result = await pool.query(`INSERT INTO users (${fields}) 
        VALUES (?, ?, ?, ?, ?)`, values).catch((err) => console.log(err));
       
  });
     return result;
  },
  insertPermission: async (data: any) => {
    const values = Object.values(data);
    const fields = Object.keys(data).join(', ');
    const result = await pool.query(`INSERT INTO permissions (${fields}) 
      VALUES (?)`, values).catch((err) => console.log(err));
    return result;
 },
  updateUser: async (data: UserEntity) => {
    const newData = formatToDB({uuid: randomUUID(), userLogin: data.userLogin, 
      userPassword: data.userPassword, createDate: dayjs().format('YYYY-MM-DD'), fio: data.fio });
    const values = Object.values(newData);
    const fields = Object.keys(newData).join(', ');
    const result = await pool.query(`UPDATE users (${fields}) 
      VALUES (?, ?, ?, ?, ?) WHERE id = ${data.id}`, values).catch((err) => console.log(err));
    return result;
  },
  getUserPermissions: async (userId: number) => {
    const [permissions] = await pool.query(`SELECT permissions.* 
     FROM permissions   
      INNER JOIN permissions_users 
         ON permissions.id = permissions_users.permission_id 
     WHERE permissions_users.user_id = ${userId};`);
     return permissions.map(perm => formatFromDB(perm));
  },
  deleteUser: async (id: number) => {
    const result = await pool.query(`DELETE FROM users WHERE id = ${id}`).catch((err) => console.log(err));
    return result;
  }
});