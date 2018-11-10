import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      new User(1, 'johndoe_1', 'John', 'Doe', ['Cricket', 'Computer games'], 246848884, 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'),
      new User(2, 'samjones', 'Sam', 'Jones', ['Fitness', 'Trekking', 'Football'], 989748484, 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'),
      new User(3, 'dougcharles', 'Doug', 'Charles', ['Cooking', 'Basketball'], 347979595, 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'),
      new User(4, 'patrickbuck', 'Patrick', 'Buck', ['Football', 'Cycling', 'DIY stuff'], 535773733, 'https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg'),
      new User(5, 'rajmathur', 'Raj', 'Mathur', ['Web development', 'IT news'], 326634099, 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg'),
      new User(6, 'stephencoin', 'Stephen', 'Coin', ['Photography', 'Gardening'], 870074444, 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'),
      new User(7, 'richard_butler','Richard', 'Butler', ['Swimming', 'Fencing', 'Horse racing', 'Boating'], 477537389, 'https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg'),
      new User(8, 'greenhorne', 'Green', 'Horne', ['Shooting', 'Archery'], 868383553, 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg')
    ];

    return {users};
  }
}
