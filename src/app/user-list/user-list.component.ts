import {Component, OnInit} from '@angular/core';
import {User} from "../shared/data.model";
import {DataService} from "../shared/data.service";
import {FeedbackService} from "../shared/feedback/feedback.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role', 'action'];

  constructor(public dataService: DataService, private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.dataService.loadUsers();
  }

  get userList(): User[] {
    return this.dataService.userList;
  }

  delete(id: number) {
    this.dataService.deleteUser(id).subscribe(
      res => {
        this.feedbackService.info.next(`ùser ${id} deleted`);
        location.reload();
      },
      error => {
        this.feedbackService.warning.next(error.message);
      }
    );
  }

}
