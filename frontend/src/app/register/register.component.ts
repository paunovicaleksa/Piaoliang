import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router, private agencyService: AgencyService, 
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.type = 'agency';
  }

  message: string = "";
  username: string;
  password: string;
  confirmPassword: string;
  type: string;
  phoneNumber: string;
  email: string;

  /* user specific stuff */
  firstName: string;
  lastName: string;

  /* agency specific stuff */
  agencyName: string;
  address: string;
  agencyNumber: string;
  description: string;

  selectedImage: File = null;

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  register(){
    if(this.username != null && this.password != null && this.confirmPassword != null && 
      this.type != null && this.phoneNumber != null && this.email != null){
      if(this.password == this.confirmPassword){
        if(this.type == "client"){
          if(this.firstName != null && this.lastName != null){ 
            const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            const phoneRegex = new RegExp("^[0-9]{9,10}$");
            /* hopefully works? */
            const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z])[a-zA-Z][\w!@#$%^&*()]{6,11}$/);

            if(!passwordRegex.test(this.password)){
              this.message = "password must include 1 uppercase, 1 number, 1 special character\
              [!@#$%^&*()], and be 7-12 characters long";
              return;
            } 
      
            if(!emailRegex.test(this.email)){
              this.message = "invalid email";
              return;
            }

            if(!phoneRegex.test(this.phoneNumber)){
              this.message = "invalid phone number";
              return;
            }

            const imageForm = new FormData();
            
            imageForm.append('username', this.username);
            imageForm.append('password', this.password);
            imageForm.append('type', this.type);
            imageForm.append('phoneNumber', this.phoneNumber);
            imageForm.append('email', this.email);
            imageForm.append('firstName', this.firstName);
            imageForm.append('lastName', this.lastName);
            
            if(this.selectedImage != null) imageForm.append('image', this.selectedImage, this.selectedImage.name);

            this.clientService.addOne(imageForm).subscribe((m) =>{
              if(m['msg'] == "success"){
                this.requestService.addOne({username: this.username, email: this.email, type: 'agency'}, 'pending', 'registration').subscribe((m) => {
                  if(m['msg'] == "success"){
                    alert("success");
                    this.router.navigate([""]);
                  }
                });
              } 
              else {
                this.message = m['msg'];
              }
            })
          } else {
            this.message = "please fill in all fields";
          }
        } else if(this.type == "agency"){
          if(this.agencyName != null && this.address != null && this.agencyNumber != null && this.description != null){
            const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            const phoneRegex = new RegExp("^[0-9]{9,10}$");
            const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z])[a-zA-Z][\w!@#$%^&*()]{6,11}$/);
  
            if(!passwordRegex.test(this.password)){
              this.message = "password must include 1 uppercase, 1 number, 1 special character\
              [!@#$%^&*()], and be 7-12 characters long";
              return;
            } 
  
            if(!emailRegex.test(this.email)){
              this.message = "invalid email";
              return;
            }
  
            if(!phoneRegex.test(this.phoneNumber)){
              this.message = "invalid phone number";
              return;
            }
  
            const imageForm = new FormData();
  
            imageForm.append('username', this.username);
            imageForm.append('password', this.password);
            imageForm.append('type', this.type);
            imageForm.append('phoneNumber', this.phoneNumber);
            imageForm.append('email', this.email);
            /* add agency-specific fields */
            imageForm.append('agencyName', this.agencyName);
            imageForm.append('address', this.address);
            imageForm.append('agencyNumber', this.agencyNumber);
            imageForm.append('description', this.description);
  
            if(this.selectedImage != null) imageForm.append('image', this.selectedImage, this.selectedImage.name);
  
            this.agencyService.addOne(imageForm).subscribe((m) =>{
              if(m['msg'] == "success"){
                this.requestService.addOne({username: this.username, email: this.email, type: 'agency'}, 'pending', 'registration').subscribe((m) => {
                  if(m['msg'] == "success"){
                    alert("success");
                    this.router.navigate([""]);
                  }
                });
              } else {
                this.message = m['msg'];
              }
            });
          } else {
            this.message = "please fill in all fields";
          }


        } else {
          this.message = "please select user type";
        }
      } else {
        this.message = "passwords don't match";
      }
    } else {
      this.message = "please fill in all fields";
    }
  }
}
