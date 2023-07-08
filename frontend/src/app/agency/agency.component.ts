import { Component, OnInit } from '@angular/core';
import { Agency } from '../model/agency';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private agencyService: AgencyService, private router: Router) { }

  ngOnInit(): void {
    this.agencyService.getOne(sessionStorage.getItem('agency')).subscribe((agencyDB: Agency) => {
      this.agency = agencyDB;
    });
  }

  agency: Agency;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  message: string = ""

  selectedImage: File = null;
  
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getImage(){
    return `http://localhost:4000/uploads/${this.agency.other.profilePicture}`;
  }

  changeImage(){
    if(this.selectedImage != null){
      const imageForm = new FormData();
      imageForm.append('username', this.agency.username);
      imageForm.append('image', this.selectedImage, this.selectedImage.name);
      this.agencyService.changeImage(imageForm).subscribe((msg) => {
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

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  changePassword(){
    if(this.newPassword == this.confirmPassword){
      this.agencyService.changePassword(this.agency.username, this.newPassword).subscribe((msg) => {
        if(msg['msg'] == "success"){
          alert("password changed");
          this.ngOnInit();
        } else {
          alert("something went wrong :(");
        }
      });
    } else {
      alert("passwords don't match");
    }
  }

}
