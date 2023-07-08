import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000/object";

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  addOne(address: string, area: number, roomNumber: number,  type: string, client: string, rooms, doors){
    const data = {
      objectAddress: address,
      area: area,
      roomNumber: roomNumber,
      objectType: type,
      client: client,
      rooms: rooms,
      doors: doors
    }

    return this.http.post(`${this.uri}/addOne`, data);
  }

  modifyObject(id: number, address: string, area: number, roomNumber: number, type: string,  rooms, doors){
    const data = {
      id: id,
      objectAddress: address,
      area: area,
      roomNumber: roomNumber,
      objectType: type,
      rooms: rooms,
      doors: doors
    }

    return this.http.post(`${this.uri}/modifyObject`, data);
  }

  deleteOne(id: number){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/deleteOne`, data);
  }
}
