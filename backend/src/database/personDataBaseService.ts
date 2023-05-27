import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { formatFromDB, formatToDB } from '../utils/utils';
import { PersonCardState } from '../models/PersonEntity';

export const personDataBaseService = (pool: any) => ({
  getPersons: async () => {
    const [data] = await pool.query('SELECT * FROM persons');
    return (data as PersonCardState[]).map(person => formatFromDB(person));
   },
  getPersonByID: async (id: number) => {
     const [data] = await pool.query(`SELECT * FROM persons WHERE id = ?`, [id]);
     return formatFromDB(data[0]) as PersonCardState;
   },
  insertPerson: async (data: PersonCardState) => {
     const newData = formatToDB({...data, uuid: randomUUID(), personStatus: 'NEW', createDate: dayjs().format('YYYY-MM-DD')});
     const values = Object.values(newData);
     const fields = Object.keys(newData).join(', ');
     const result = await pool.query(`INSERT INTO persons (${fields}) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values).catch((err) => console.log(err));
     return result;
   },
  updatePerson: async (data: PersonCardState) => {
    const values = Object.values(data);
    const fields = Object.keys(data).join(', ');
    const result = await pool.query(`UPDATE persons (${fields}) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ${data.id}`, values).catch((err) => console.log(err));
    return result;
  },
  deletePerson: async (id: number) => {
    const result = await pool.query(`DELETE FROM persons WHERE id = ${id}`).catch((err) => console.log(err));
    return result;
  }
});