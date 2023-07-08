import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ObjectService } from '../services/object.service';
import { Router } from '@angular/router';
import { Client } from '../model/client';
import { Obj } from '../model/obj';

@Component({
  selector: 'app-modify-object',
  templateUrl: './modify-object.component.html',
  styleUrls: ['./modify-object.component.css']
})
export class ModifyObjectComponent implements OnInit {

  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  constructor(private clientService: ClientService, private objectService: ObjectService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) => {
      if (clientDB) this.client = clientDB;
      this.object = JSON.parse(sessionStorage.getItem("object"));
      this.rooms = this.object.rooms;
      this.doors = this.object.doors;
      this.area = this.object.area;
      this.objectAddress = this.object.objectAddress;
      this.objectType = this.object.objectType;
      this.roomNumber = this.object.roomNumber;
      this.canvasRef.nativeElement.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvasRef.nativeElement.addEventListener('click', this.handleClick.bind(this));
      this.ctx = this.canvasRef.nativeElement.getContext('2d');
      this.drawCanvas();
    });
  }

  //basic obj info
  objectAddress: string;
  area: number;
  roomNumber: number;
  objectType: string;
  client: Client = null;
  object: Obj;
  

  //canvas stuff
  ctx: CanvasRenderingContext2D;
  rooms: { x: number, y: number, width: number, height: number, background: string }[] = [];
  currentRoom: { x: number, y: number, width: number, height: number, background: string } = null;
  currentDoor: { x: number, y: number, width: number, height: number } = null;
  doors: { x: number, y: number, width: number, height: number }[] = [];
  roomWidth: number;
  roomHeight: number;
  toDrawRoom: boolean = false;
  toDrawDoor: boolean = false;

  type: string = "";

  drawCanvas() {
    console.log(this.rooms);  
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.rooms.forEach(room => {
      this.drawRoom(room.x, room.y, room.width, room.height, 'black', room.background);
    });

    this.doors.forEach(door => {
      this.drawDoor(door.x, door.y, door.width, door.height, 'brown');
    });

    if (this.currentRoom) {
      this.drawRoom(this.currentRoom.x, this.currentRoom.y, this.currentRoom.width, this.currentRoom.height, 'olive', this.currentRoom.background);
    }
    
    if(this.currentDoor){
      this.drawDoor(this.currentDoor.x, this.currentDoor.y, this.currentDoor.width, this.currentDoor.height, 'olive');
    }
  }
  /* scaling does NOTHING, fix it. */
  handleMouseMove(event: MouseEvent) {
    if (this.toDrawRoom ) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      const scaleX = this.canvasRef.nativeElement.width / rect.width;
      const scaleY = this.canvasRef.nativeElement.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
  
      this.currentRoom = {
        x: x,
        y: y,
        width: this.roomWidth,
        height: this.roomHeight,
        background: 'white' 
      };

      this.drawCanvas();
    }
    else if(this.toDrawDoor){
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      const scaleX = this.canvasRef.nativeElement.width / rect.width;
      const scaleY = this.canvasRef.nativeElement.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
  
      this.currentDoor = {
        x: x,
        y: y,
        width: this.roomWidth,
        height: this.roomHeight 
      };

      this.drawCanvas();
    }
  }

  /* this is where i should add some overlap checks etc. later if i have time */
  handleClick(event: MouseEvent) {
    if(this.roomNumber > 3 || this.roomNumber < 1){
      alert("Room number must be between 1 and 3");
      return;
    }
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const scaleX = this.canvasRef.nativeElement.width / rect.width;
    const scaleY = this.canvasRef.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    // Add the new rectangle to the array
    if(this.toDrawRoom && this.rooms.length < this.roomNumber && this.roomHeight > 0 
        && this.roomWidth > 0 && !this.isOverlapping({x, y, width: this.roomWidth, height: this.roomHeight})){
      this.rooms.push({ x, y, width: this.roomWidth, height: this.roomHeight, background: 'white' });
      this.currentRoom = null;
    }
    else if(this.toDrawDoor  && this.roomHeight > 0 && this.roomWidth > 0){
      this.doors.push({ x, y, width: this.roomWidth, height: this.roomHeight });
      this.currentDoor = null;
    } else {
      alert("something went wrong")
    }

    // Draw the updated canvas
    this.drawCanvas();

    this.toDrawRoom = false;
    this.toDrawDoor = false;
  }   

  drawRoom(x: number, y: number, width: number, height: number, color: string, background: string) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = background;
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillRect(x, y, width-2, height-2);
  }

  drawDoor(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  reset() {
    // Reset the canvas and rectangle array
    this.rooms = [];
    this.currentRoom = null;
    this.doors = [];
    this.currentDoor = null;
    this.drawCanvas();
  }

  pickRoom() {
    this.toDrawDoor = false;
    this.currentDoor = null;
    this.toDrawRoom = true;
  }

  pickDoor() {
    this.toDrawRoom = false;
    this.currentRoom = null;
    this.toDrawDoor = true;
  }

  isOverlapping(newRoom: { x: number, y: number, width: number, height: number }): boolean {
    for (const room of this.rooms) {
      if (
        newRoom.x < room.x + room.width &&
        newRoom.x + newRoom.width > room.x &&
        newRoom.y < room.y + room.height &&
        newRoom.y + newRoom.height > room.y
      ) {
        return true; 
      }
    }
    return false; 
  }


  modify(){
    if(this.roomNumber > 3 || this.roomNumber < 1 || this.objectType == "" || this.area < 1 
      || this.client == null || this.rooms.length < this.roomNumber){
      alert("incorrect information");
      return;
    }

    this.objectService.modifyObject(this.object.id, this.objectAddress, this.area, 
      this.roomNumber, this.objectType, this.rooms, this.doors).subscribe((m) => {
        if(m['msg'] == 'success'){
          alert("object modified");
          this.router.navigate(['/objects']);
        } else{
          alert("something went wrong");
        }
      })
  }

}
