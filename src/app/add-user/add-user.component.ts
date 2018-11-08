import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  interests: string[] = [
    'Football',
    'Cycling',
    'DIY stuff'
  ];

  constructor() { }

  ngOnInit() {
  }

  deleteInterest(interest: string): void {
    let index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
    }
  }

}
