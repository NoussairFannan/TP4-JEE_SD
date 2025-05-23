import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private logService:LoginService) {
  }

  ngOnInit(): void {
  }

  handleLogout() {
    this.logService.logout()
  }
  getLogService(){
    return this.logService;
  }

}
