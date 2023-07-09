import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000/job";

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  addOne(agency: string, client: string, object: number){
    const data = {
      agency: agency,
      client: client,
      object: object
    }

    return this.http.post(`${this.uri}/addOne`, data);
  }

  updateOne(id: number, status: string, paid: boolean, price: number){
    const data = {
      id: id,
      status: status,
      paid: paid,
      price: price
    }

    return this.http.post(`${this.uri}/updateOne`, data);
  }

  deleteOne(id: number){
    let data = {
      id: id
    }

    return this.http.post(`${this.uri}/deleteOne`, data);
  }
}
