import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Agency } from '../model/agency';
import { Client } from '../model/client';
import { Job } from '../model/job';
import { Obj } from '../model/obj';
import { JobService } from '../services/job.service';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { AgencyService } from '../services/agency.service';
import { ObjectService } from '../services/object.service';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../model/worker';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;


  constructor(private jobService: JobService, private clientService: ClientService,
    private agencyService: AgencyService, private router: Router, private requestService: RequestService,
    private objectService: ObjectService, private workerService: WorkerService) { }
  ngOnInit(): void {
    switch(sessionStorage.getItem("loggedType")){
      case "client": {
        this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) => {
          if(clientDB){
            this.client = clientDB;
            this.jobService.getAll().subscribe((jobDB: Job[]) => {
              this.job = jobDB.filter(job => job.id == JSON.parse(sessionStorage.getItem('job')))[0];
              this.objectService.getAll().subscribe((objDB: Obj[]) => {
                this.object = objDB.filter(obj => obj.id == this.job.object)[0];
                this.agencyService.getAll().subscribe((agencyDB: Agency[]) => {
                  this.jobAgency = agencyDB.filter(agency => agency.username == this.job.agency)[0];
                  this.jobClient = clientDB;
                  this.ctx = this.canvasRef.nativeElement.getContext('2d');
                  this.workerService.getAll().subscribe((workerDB: Worker[]) => {
                    this.workers = workerDB.filter(worker => worker.agency == this.jobAgency.username);
                  });
                  this.drawCanvas();
                  this.rating = this.jobAgency.other.ratings.filter(rating => rating.job == this.job.id)[0].rating;
                  this.comment = this.jobAgency.other.ratings.filter(rating => rating.job == this.job.id)[0].comment;
                });
              });
            });
          }
        });
        break;
      }
      /* check later, may be incorrect */
      case "agency":
        this.agencyService.getOne(sessionStorage.getItem("agency")).subscribe((agencyDB: Agency) => {
          if(agencyDB){
            this.agency = agencyDB;
            this.jobService.getAll().subscribe((jobDB: Job[]) => {
              this.job = jobDB.filter(job => job.id == JSON.parse(sessionStorage.getItem('job')))[0];
              this.objectService.getAll().subscribe((objDB: Obj[]) => {
                this.object = objDB.filter(obj => obj.id == this.job.object)[0];
                this.clientService.getAll().subscribe((clientDB: Client[]) => {
                  this.jobAgency = agencyDB;
                  this.jobClient = clientDB.filter(client => client.username == this.job.client)[0];
                  this.ctx = this.canvasRef.nativeElement.getContext('2d');
                  this.canvasRef.nativeElement.addEventListener('click', this.handleClick.bind(this));
                  this.workerService.getAll().subscribe((workerDB: Worker[]) => {
                    this.workers = workerDB.filter(worker => worker.agency == this.agency.username && worker.job == -1);
                    if(this.job.status == "ready" && this.workers.length < this.object.roomNumber){
                      this.object.rooms.forEach(room => {
                        room.background = "yellow";
                      });
                    }
                    this.drawCanvas();
                  });
                });
              });
            });
          }
        });
        break;
    }
  }

  ctx: CanvasRenderingContext2D;


  jobAgency: Agency = null;
  jobClient: Client = null;
  job: Job = null;
  object: Obj = null;

  client: Client = null;
  agency: Agency = null;

  /* client job stuff */
  cancellationReason: string = null;
  payment: number = null;
  rating: number = null;
  comment: string = null;

  /* agency job stuff */
  price: number = null;
  workers: Worker[] = null;
  colorRoom: boolean = false;

  handleClick(event: MouseEvent){
    if(this.colorRoom){
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      const scaleX = this.canvasRef.nativeElement.width / rect.width;
      const scaleY = this.canvasRef.nativeElement.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      this.object.rooms.forEach(room => {
        if(x >= room.x && x <= room.x + room.width && y >= room.y && y <= room.y + room.height){
          room.background = "green";
        }
      });

      this.drawCanvas();

      this.colorRoom = false;
    }
  }

  finishRoom(){
    this.colorRoom = true;
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

  drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.object.rooms.forEach(room => {
      this.drawRoom(room.x, room.y, room.width, room.height, 'black', room.background);
    });

    this.object.doors.forEach(door => {
      this.drawDoor(door.x, door.y, door.width, door.height, 'brown');
    });
  }

  /* send request, and admin will take care of workers and other stuff i guess? */
  cancel(){
    if(this.cancellationReason != null){
      this.requestService.addOne({id: this.job.id, cancellationReason: this.cancellationReason}, 'pending', 'cancellation').subscribe((m) => {
        if(m['msg'] == 'success'){
          alert("Request sent!");
        }
      });
    }
  }

  roomCheck(){
    let check = true;
    this.object.rooms.forEach(room => {
      if(room.background != "green"){
        check = false;
      }
    });

    return check;
  }
  /* free workers and set status to finished? */
  finishJob(){
    let jobWorkers = this.workers.filter(worker => worker.job == this.job.id);

    this.object.rooms.forEach(room => {
      room.background = "white";
    });

    this.jobService.updateOne(this.job.id, 'finished', true, this.job.price).subscribe((m) => {
      if(m['msg'] == 'success'){
        this.objectService.modifyObject(this.object.id, this.object.objectAddress, this.object.area, this.object.roomNumber,
          this.object.objectType, this.object.rooms, this.object.doors).subscribe((m) => {
            jobWorkers.forEach(worker => {
              this.workerService.assignJob(worker.id, -1).subscribe((m) => {
                if(m['msg'] == 'success' && worker == jobWorkers[jobWorkers.length-1]){
                  this.ngOnInit();
                }
              });
            });
          });
      }
    });
  }

  accept(){
    if(this.price == null || this.price < 0){
      alert("Please enter a valid price");
      
    } else {
      this.jobService.updateOne(this.job.id, 'accepted', false, this.price).subscribe((m) => {
        if(m['msg'] == 'success'){
          alert("Job accepted");
          this.ngOnInit();
        }
      });
    }
  }

  isOccupied(worker: Worker){
    return worker.job != -1? 'occupied': 'free';
  }

  reject(){
    this.jobService.updateOne(this.job.id, 'rejected', false, this.job.price).subscribe((m) => {
      if(m['msg'] == 'success'){
        this.ngOnInit();
      }
    });
  }

  start(){
    this.jobService.updateOne(this.job.id, 'ready', false, this.job.price).subscribe((m) => {
      if(m['msg'] == 'success'){
        this.ngOnInit();
      }
    });
  }
  /* update object so all room backgrounds are RED */
  assign(){
    let checked: Array<Worker> = this.workers.filter(worker => worker.checked);

    if(checked.length < this.object.rooms.length){
      alert("Please select at least one worker per room");
    } else {
      this.jobService.updateOne(this.job.id, 'active', false, this.job.price).subscribe((m) => {
        if(m['msg'] == 'success'){
          checked.forEach(worker => {
            this.workerService.assignJob(worker.id, this.job.id).subscribe((m) => {
              if(m['msg'] == 'success' && worker == checked[checked.length-1]){
                this.object.rooms.forEach(room => {
                  room.background = 'red';
                });  
                this.objectService.modifyObject(this.object.id, this.object.objectAddress, this.object.area, this.object.roomNumber,
                  this.object.objectType, this.object.rooms, this.object.doors).subscribe((m) => {
                  if(m['msg'] == 'success'){
                    this.ngOnInit();
                  }
                });
              }
            });
          });  
        }
      });


    }
  }

  saveProgress(){
    this.objectService.modifyObject(this.object.id, this.object.objectAddress, this.object.area, this.object.roomNumber,
      this.object.objectType, this.object.rooms, this.object.doors).subscribe((m) => {
      if(m['msg'] == 'success'){
        alert('progress saved');
        this.ngOnInit();
      }
    });
  }

  rate(){
    if(this.rating == null || this.rating < 1 || this.rating > 5){ 
      alert("Please enter a rating");
      return;
    } else {
        this.agencyService.addRating(this.job.client, this.rating, this.comment, this.job.id, this.jobAgency.username).subscribe((m) => {
          if(m['msg'] == 'success'){
            alert("Rating added");
            this.ngOnInit();
          }
        });
    }
  }
}
