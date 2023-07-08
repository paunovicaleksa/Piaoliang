import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private httpClient: HttpClient) { }

  uri: string = "http://localhost:4000/agency";

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.httpClient.post(`${this.uri}/login`, data);
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

  getOne(username: string){
    const data = {
      username: username
    }

    return this.httpClient.post(`${this.uri}/getOne`, data);
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

  addRating(user: string, rating: number, comment: string, job: number, agency: string){
    const data = {
      user: user,
      rating: rating,
      comment: comment,
      job: job,
      agency: agency
    }

    return this.httpClient.post(`${this.uri}/addRating`, data);
  }

  addVacancies(username: string, vacancies: number){
    const data = {
      username: username,
      vacancies: vacancies
    }

    return this.httpClient.post(`${this.uri}/addVacancies`, data);
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

  modifyAgency(username: string, password: string, agencyNumber: number, name: string, agencyAddress: string, 
  email: string, status: string, profilePicture: string, vacancies: number){
    const data = {
      username: username,
      password: password,
      agencyNumber: agencyNumber,
      name: name,
      agencyAddress: agencyAddress,
      email: email,
      status: status,
      profilePicture: profilePicture,
      vacancies: vacancies
    }

    return this.httpClient.post(`${this.uri}/modifyAgency`, data);
  }
}
