import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  selectedUserFirstName: string;
  sortAscending = true;
  userToDelete;
  searchTerm;

  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.subscription = this.eventService.getMessage()
      .subscribe(message => {
        if (message.content.name === 'searchExecuted') {
          this.searchTerm = message.content.value;
          this.searchUsers();
        }

        if (message.content.name === 'userAdded') {
          let newUser = message.content.value;
          this.addUser(newUser);
        }
      })
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.users.sort((a: User, b: User) => {
          let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
          return sortNum;
        })
      })
  }

  isSelected(user: User) {
    return user.firstName === this.selectedUserFirstName;
  }

  sortByName(): void {
    this.sortAscending = !this.sortAscending;
    this.users.sort((a: User, b: User) => {
      let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
      if (!this.sortAscending) {
        sortNum = -sortNum;
      }
      return sortNum;
    })
  }

  deleteUser(user: User): void {
    this.userToDelete = user;
  }

  deleteUserConfirmed(): void {
    if (this.userToDelete) {
      this.users = this.users.filter(h => h !== this.userToDelete);
      this.userService.deleteUser(this.userToDelete).subscribe();
    }
  }

  selectUser(firstName: string): void {
    this.router.navigate([firstName], {relativeTo: this.route});
  } 

  searchUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.filter(item => {
          let usernameResults = item.username.toLowerCase().includes(this.searchTerm.toLowerCase())
          let result = '';
          item.interests.forEach(obj => {
            result += obj.toLowerCase() + ','
          });
          let interestsResults = result.includes(this.searchTerm.toLowerCase());
          return usernameResults || interestsResults;
        })
        this.users.sort((a: User, b: User) => {
          let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
          return sortNum;
        })        
      })
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
    this.users.sort((a: User, b: User) => {
      let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
      return sortNum;
    })
  }
}
