import { Component, Input, OnInit } from '@angular/core';
import { FinFlowUser } from '../model/fin-flow-user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  finFlowUser: FinFlowUser;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    const url = "/api/v1/users/profile"
    this.http.get(url)
    .pipe(
      map((response: FinFlowUser) => {
        const userProfile = response;
        return userProfile;
      })
    )
    .subscribe((resp: FinFlowUser) => {
      this.finFlowUser = resp;
    });    
  }
}
