import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ObjectService } from '../services/object.service';
import { Router } from '@angular/router';
import { Client } from '../model/client';
import { Obj } from '../model/obj';

@Component({
  selector: 'app-view-object',
  templateUrl: './view-object.component.html',
  styleUrls: ['./view-object.component.css']
})
export class ViewObjectComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  constructor(private clientService: ClientService, private objectService: ObjectService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) =>{
      if(clientDB) {
        this.client = clientDB;
        this.object = JSON.parse(sessionStorage.getItem("object"));
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.drawCanvas();
      }
    });
  }

  drawCanvas() {
 
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.object.rooms.forEach(room => {
      this.drawRoom(room.x, room.y, room.width, room.height, 'black', room.background);
    });

    this.object.doors.forEach(door => {
      this.drawDoor(door.x, door.y, door.width, door.height, 'brown');
    });

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

  ctx: CanvasRenderingContext2D;
  client: Client;
  object: Obj;

  modify(){
    this.router.navigate(['modify-object']);
  }
  goBack(){
    this.router.navigate(['objects']);
  }

}
