import {Component, OnInit} from '@angular/core';
import {User} from "../shared/data.model";
import {DataService} from "../shared/data.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'email', 'birthday', 'action'];

  constructor(public dataService: DataService) {
  }



  ngOnInit(): void {
    this.dataService.loadUsers();
  }


  delete(id: number) {
    if (confirm('Est-ce que vous confirmez?')) {
      this.dataService.deleteUser(id).subscribe(value => this.dataService.loadUsers());
    }
  }

}
