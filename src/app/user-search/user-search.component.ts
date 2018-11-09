import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  searchTerm: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  searchUsers(): void {
    this.eventService.sendMessage({'name': 'searchExecuted', value: this.searchTerm});
  }

}
