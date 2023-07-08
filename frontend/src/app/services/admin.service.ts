import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  uri: string = "http://localhost:4000/admin";

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.httpClient.post(`${this.uri}/login`, data);
  }

  getOne(username: string){
    const data = {
      username: username
    }

    return this.httpClient.post(`${this.uri}/getOne`, data);
  }
}
