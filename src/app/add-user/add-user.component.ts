import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User = new User(
    this.getRandomId(),
    '',
    '',
    '',
    [],
    555555555,
    ''
  )

  phoneNumberHasError = false;

  isAddButtonDisabled: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  checkInterest(event): void {
    if (event.target.value !== '') {
      this.isAddButtonDisabled = false;
    } else {
      this.isAddButtonDisabled = true;
    }
  }

  getRandomId(): number {
    let min = 10;
    let max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addInterest(interest): void {
    this.newUser.interests.push(interest);
  }

  deleteInterest(interest: string): void {
    let index = this.newUser.interests.indexOf(interest);
    if (index !== -1) {
      this.newUser.interests.splice(index, 1);
    }
  }

  onAddUser(): void {
    this.userService.addUser(this.newUser)
      .subscribe(user => {
        this.eventService.sendMessage({'name': 'userAdded', value: user});
        this.router.navigate(['users']);
      })    
  }

  validatePhoneNumber(value): void {
    if (value == null || value === 0 || value === '') {
      this.phoneNumberHasError = true;
    } else {
      this.phoneNumberHasError = false;
    }
  }
}
