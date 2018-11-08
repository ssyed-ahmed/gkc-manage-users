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
      new User('johndoe_1', 'John', 'Doe', ['Cricket', 'Computer games'], 246848884, 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'),
      new User('samjones', 'Sam', 'Jones', ['Fitness', 'Trekking'], 989748484, 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'),
      new User('dougcharles', 'Doug', 'Charles', ['Cooking', 'Stitching'], 347979595, 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'),
      new User('patrickbuck', 'Patrick', 'Buck', ['Football', 'Cycling', 'DIY stuff'], 535773733, 'https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg'),
      new User('rajmathur', 'Raj', 'Mathur', ['Web development', 'IT news'], 326634099, 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg'),
      new User('stephencoin', 'Stephen', 'Coin', ['Photography', 'Gardening'], 870074444, 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg')
    ];

    return {users};
  }
}
