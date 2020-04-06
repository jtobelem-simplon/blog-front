import {Component, OnInit} from '@angular/core';
import {JwtService} from "../shared/jwt/jwt.service";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../shared/data.service";
import {NewPostDialog} from "../post-list/new-dialog/new-post-dialog";

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.css']
})
export class MenuFooterComponent implements OnInit {

  constructor(public jwtService: JwtService, private postService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.postService.savePost(result).subscribe(value => {
        location.reload(); // TODO utilise getPost dans postList
      });
    })

  }

}


