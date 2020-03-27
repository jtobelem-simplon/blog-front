import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../shared/data.model";

@Component({
  selector: 'new-post-dialog',
  templateUrl: 'new-post-dialog.html',
})
export class NewPostDialog {

  constructor(
    public dialogRef: MatDialogRef<NewPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Post) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
