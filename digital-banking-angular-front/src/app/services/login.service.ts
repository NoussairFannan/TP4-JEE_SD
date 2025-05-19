import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAutenticated : boolean = false;
  roles : any;
  username : any;
  accessToken !: any;

  constructor(private http:HttpClient,private router:Router) {}

  public Login(username:string,password:string){
    let options =
      {
        headers:new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
      }
    let params = new HttpParams().set("username",username).set("password",password);
    return this.http.post(environment.backendHost+"/login",params,options);
  }

  loadProfile(data:any) {
    this.isAutenticated=true;
    this.accessToken= data["access_token"];
    let decodedJwt:any= jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem("accessToken",this.accessToken);
  }

  logout() {
    this.isAutenticated=false;
    this.username=undefined;
    this.roles=undefined;
    this.accessToken=undefined;
    window.localStorage.removeItem("accessToken");
    this.router.navigateByUrl("/login")
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("accessToken");
    this.accessToken = token;
    this.loadProfile({"access_token":token});
    this.router.navigateByUrl("/admin/customers");

  }

}
