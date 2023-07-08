import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000/request";

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  addOne(other: any, status: string, type: string){
    const data = {
      other: other,
      status: status,
      type: type
    }

    return this.http.post(`${this.uri}/addOne`, data);
  }

  reject(id: number){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/reject`, data);
  }

  accept(id: number){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/accept`, data);
  }
}
