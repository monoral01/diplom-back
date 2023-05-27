import dayjs from 'dayjs';
import mysql from 'mysql2';
import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';
import { formatFromDB, formatToDB } from '../utils/utils';
import { CompanyCardState } from '../models/CompanyEntity';
  
export const companyDataBaseService = (pool: any) => ({
  getCompanies: async () => {
    const [data] = await pool.query('SELECT * FROM companies');
    return (data as CompanyCardState[]).map(company => formatFromDB(company));
   },
  getCompanyByID: async (id: number) => {
     const [data] = await pool.query(`SELECT * FROM companies WHERE id = ?`, [id]);
     return formatFromDB(data[0]) as CompanyCardState;
   },
  insertCompany: async (data: CompanyCardState) => {
     const newData = formatToDB({...data, uuid: randomUUID(), companyStatus: 'NEW', createDate: dayjs().format('YYYY-MM-DD')});
     const values = Object.values(newData);
     const fields = Object.keys(newData).join(', ');
     const result = await pool.query(`INSERT INTO companies (${fields}) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values).catch((err) => console.log(err));
     return result;
   },
  updateCompany: async (data: CompanyCardState) => {
    const values = Object.values(data);
    const fields = Object.keys(data).join(', ');
    const result = await pool.query(`UPDATE companies (${fields}) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ${data.id}`, values).catch((err) => console.log(err));
    return result;
  },
  deleteCompany: async (id: number) => {
    const result = await pool.query(`DELETE FROM companies WHERE id = ${id}`).catch((err) => console.log(err));
    return result;
  }
});