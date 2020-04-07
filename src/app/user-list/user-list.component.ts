import {Component, OnInit} from '@angular/core';
import {User} from "../shared/data.model";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'action'];

  constructor(public dataService: DataService) {
  }

  users: User[];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUsers().subscribe(users => this.users = users);
  }


  delete(id: number) {
    if (confirm('Est-ce que vous confirmez?')) {
      this.dataService.deleteUser(id).subscribe(value => this.getUsers());
    }
  }

}
