import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import * as moment from 'moment';
import {Role, User} from "../shared/data.model";
import {DataService} from "../shared/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // @ViewChild('myForm') myNgForm; // https://stackoverflow.com/a/43985754/10364570

  form: FormGroup;
  roles: Role[];

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) {
  } // https://stackoverflow.com/questions/40249065/no-provider-for-formbuilder

  ngOnInit() {
    this.getRoles();

    this.form = this.fb.group({
      name: [, Validators.required],
      email: [, Validators.email],
      birthday: [, this.dateValidator],
      role: [, Validators.required]
    });
  }

  getRoles() {
    this.dataService.getRoles().subscribe(roles => this.roles = roles);
  }

  submit() {
    const newUser : User = {
      name: this.form.get("name").value,
      email: this.form.get("email").value,
      birthday: this.form.get("birthday").value.toDate(),
      role: this.form.get("role").value
    };

    // this.form.reset();
    // this.myNgForm.reset();
    // this.myNgForm.resetForm();

    this.dataService.saveUser(newUser).subscribe( value => this.dataService.loadUsers());
  }

  dateValidator(control: FormControl): { [s: string]: any } | null {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
        return {invalidDate: 'You cannot use future dates'}
      }
    }
    return null;
  }

}


