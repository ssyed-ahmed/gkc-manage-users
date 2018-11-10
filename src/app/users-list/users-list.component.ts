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

  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  pagedData: User[];

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

        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.pagedData = this.users;
      })
  }

  isSelected(user: User) {
    return user.firstName === this.selectedUserFirstName;
  }

  sortByName(): void {
    this.sortAscending = !this.sortAscending;
    this.pagedData = this.pagedData.slice(0,3);
    this.pagedData.sort((a: User, b: User) => {
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
      this.pagedData = this.pagedData.filter(h => h !== this.userToDelete);
      this.userService.deleteUser(this.userToDelete).subscribe();
    }
  }

  selectUser(user: User): void {
    this.router.navigate([user.id], {relativeTo: this.route});
  } 

  searchUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.pagedData = users.filter(item => {
          let usernameResults = item.username.toLowerCase().includes(this.searchTerm.toLowerCase())
          let result = '';
          item.interests.forEach(obj => {
            result += obj.toLowerCase() + ','
          });
          let interestsResults = result.includes(this.searchTerm.toLowerCase());
          return usernameResults || interestsResults;
        })
        this.pagedData.sort((a: User, b: User) => {
          let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
          return sortNum;
        })        
      })
  }

  addUser(newUser: User): void {
    this.pagedData.push(newUser);
    this.pagedData.sort((a: User, b: User) => {
      let sortNum = a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1: 0;
      return sortNum;
    })
  }

  pageButtonDisabled(dir): boolean {
    if (dir == -1) {
      return this.currentPage === 0;
    }
    if (this.users) {
      return this.currentPage >= this.users.length/this.pageSize - 1;
    }
    return true;
  }

  paginate(multiplier): void {
    this.currentPage = this.currentPage + (multiplier * 1);
    this.pagedData = this.users.slice(this.currentPage * this.pageSize);
  }


}
