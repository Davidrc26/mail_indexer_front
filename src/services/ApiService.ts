// apiService.ts
import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:9000/api/search';

interface Email {
  id: number;
  subject: string;
  body: string;
  // Añade más campos según sea necesario
}

export default {
  async getAllEmails(data: any): Promise<any> {
    const response: AxiosResponse<any> = await axios.post(`${API_URL}`, data);
    return response;
  },
  // Puedes agregar más métodos para otras operaciones de la API aquí
};