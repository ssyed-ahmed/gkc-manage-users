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
      new User('johndoe_1', 'John', 'Doe', ['Cricket', 'Computer games'], 246848884),
      new User('samjones', 'Sam', 'Jones', ['Fitness', 'Trekking'], 989748484),
      new User('jennypark', 'Jenny', 'Park', ['Cooking', 'Stitching'], 347979595),
      new User('ahmedsaleh', 'Ahmed', 'Saleh', ['Football', 'Cycling', 'DIY stuff'], 535773733),
      new User('rajmathur', 'Raj', 'Mathur', ['Web development', 'IT news'], 326634099),
      new User('luisaremo', 'Luisa', 'Remo', ['Photography', 'Gardening'], 870074444)
    ];

    return {users};
  }
}
