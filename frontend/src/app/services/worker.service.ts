import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000/worker";

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  addOne(name: string, lastName: string, email: string, phoneNumber: string, specialization: string, agency: string, job: number){
    const data = {
      name: name,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      specialization: specialization,
      agency: agency,
      job: job
    }

    return this.http.post(`${this.uri}/addOne`, data);
  }

  assignJob(id: number, job: number){
    const data = {
      id: id,
      job: job
    }

    return this.http.post(`${this.uri}/assignJob`, data);
  }

  delete(id: number){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/delete`, data);
  }

  modifyWorker(id: number, name: string, lastName: string, email: string, phoneNumber: string, specialization: string, agency: string, job: number){
    const data = {
      id: id,
      name: name,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      specialization: specialization,
      agency: agency,
      job: job
    }

    return this.http.post(`${this.uri}/modifyWorker`, data);
  }
}
