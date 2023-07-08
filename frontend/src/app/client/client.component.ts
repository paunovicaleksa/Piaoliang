import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    const username = sessionStorage.getItem("client");
    
    if(username != null){
      this.clientService.getOne(username).subscribe((clientDB: Client) =>{
        if(clientDB) this.client = clientDB;
      });
    }
  }

  client: Client = null;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  message: string = ""

  selectedImage: File = null;
  
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getImage(){
    return `http://localhost:4000/uploads/${this.client.other.profilePicture}`;
  }

  changeImage(){
    if(this.selectedImage != null){
      const imageForm = new FormData();
      imageForm.append('username', this.client.username);
      imageForm.append('image', this.selectedImage, this.selectedImage.name);
      this.clientService.changeImage(imageForm).subscribe((msg) => {
        if(msg['msg'] == "success"){
          alert("image changed");
          this.ngOnInit();
        } else {
          alert("something went wrong :(");
        }
      });
    } else {
      alert("please select an image");
    }
  }

  changePassword(){
    if(this.oldPassword != this.client.password){
      this.message = "incorrect password";
    } else if(this.newPassword != this.confirmPassword){
      this.message = "new password and confirm password do not match";
    } else {
      /* add regex for password checking */

      this.clientService.changePassword(this.client.username, this.newPassword).subscribe((msg) => {
        if(msg['msg'] == "success"){
          alert("password changed");
          this.ngOnInit();
        } else {
          alert("something went wrong :(");
        }
      });
    }
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
