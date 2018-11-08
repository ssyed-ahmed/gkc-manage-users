import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

  onAddUser(): void {
    alert('Add');
  }
}
