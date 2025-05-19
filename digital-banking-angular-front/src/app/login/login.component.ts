import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private LoginFormGroup !: FormGroup;
  private messageError !: Object;
  public constructor(private loginService : LoginService , private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.LoginFormGroup = this.fb.group({
      username: this.fb.control("",[Validators.required]),
      password: this.fb.control("",[Validators.required])
    });

  }


  handleLoginSubmit() {
    let username:string = this.LoginFormGroup?.value.username;
    let password:string = this.LoginFormGroup?.value.password;
    this.loginService.Login(username,password).subscribe(
      {
        next:data=>{
          this.loginService.loadProfile(data);
          this.router.navigateByUrl("/admin");
        },
        error:(err)=>{
          this.messageError=err;
        }
      }
    );
  }
  getLoginFormGroup(){
    return this.LoginFormGroup;
  }
  getMessageError(){
    return this.messageError;
  }
}
