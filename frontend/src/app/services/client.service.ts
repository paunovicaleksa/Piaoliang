import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  uri: string = "http://localhost:4000/client";

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

  getAll(){
    return this.httpClient.get(`${this.uri}/getAll`);
  }

  addOne(imageForm: FormData){
    return this.httpClient.post(`${this.uri}/register`, imageForm);
  }

  forgotten(email: string){
    const data = {
      email: email
    }

    return this.httpClient.post(`${this.uri}/forgotten`, data);
  }

  changePassword(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.httpClient.post(`${this.uri}/changePassword`, data);
  }

  changeImage(imageForm: FormData){
    return this.httpClient.post(`${this.uri}/changeImage`, imageForm);
  }

  setStatus(username: string, status: string){
    const data = {
      username: username,
      status: status
    }

    return this.httpClient.post(`${this.uri}/setStatus`, data);
  }

  delete(username: string){
    const data = {
      username: username
    }

    return this.httpClient.post(`${this.uri}/delete`, data);
  }

  modifyClient(username: string, password: string, name: string, lastName: string, email: string, status: string, profilePicture: string){
    const data = {
      username: username,
      password: password,
      name: name,
      lastName: lastName,
      email: email,
      status: status,
      profilePicture: profilePicture
    }

    return this.httpClient.post(`${this.uri}/modifyClient`, data);
  }
}
