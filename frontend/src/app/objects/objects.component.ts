import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Obj } from '../model/obj';
import { ClientService } from '../services/client.service';
import { ObjectService } from '../services/object.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private clientService: ClientService, private objectService: ObjectService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) =>{
      if(clientDB) {
        this.client = clientDB;
        this.objectService.getAll().subscribe((objectsDB: Obj[]) =>{
          if(objectsDB){
            this.objects = objectsDB.filter(obj => obj.client == this.client.username);
          }
        });
      }
    });
  }

  client: Client = null;
  objects: Obj[];
  selectedFile: File;

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }


  viewObject(object: Obj){
    sessionStorage.setItem("object", JSON.stringify(object));
    this.router.navigate(["/viewObject"]);
  }

  uploadFile(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        const jsonData = JSON.parse(fileContent);

        let objectAddress = jsonData.objectAddress;
        let rooms = jsonData.rooms;
        let doors = jsonData.doors;
        let area = jsonData.area;
        let objectType = jsonData.objectType;
        let roomNumber = jsonData.roomNumber;

        if(!this.isOverlapping(rooms)){
          this.objectService.addOne(objectAddress, area, roomNumber, objectType, this.client.username, rooms, doors).subscribe((m) => {
            if (m['msg'] == 'success'){
              this.ngOnInit();
            }
          });
        } else {
            alert("Rooms are overlapping!");
        }
      };
      /* read the file */
      reader.readAsText(this.selectedFile);
    }
  }

  deleteObject(object: Obj){
    this.objectService.deleteOne(object.id).subscribe((m) => {
      if (m['msg'] == 'success'){
        this.ngOnInit();
      }
    });
  }
  /* check if this works */
  isOverlapping(rooms): boolean {
    for (const room of rooms) {
      for (const newRoom of rooms){
        if (
          newRoom != room &&
          newRoom.x < room.x + room.width &&
          newRoom.x + newRoom.width > room.x &&
          newRoom.y < room.y + room.height &&
          newRoom.y + newRoom.height > room.y
        ) {
          return true; 
        }
      }
    }
    return false; 
  }
}
