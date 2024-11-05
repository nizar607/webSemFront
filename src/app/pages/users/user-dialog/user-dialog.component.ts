import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

  userForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.isEdit = data.isEdit;
    this.userForm = this.fb.group({
      id: [{ value: data.user?.id || '', disabled: this.isEdit }],
      username: [data.user?.username || '', Validators.required],
      role: [data.user?.role || '', [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit && data.user) {
      this.originalName = data.user.name;
      this.userForm.patchValue(data.user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      
      if (this.isEdit) {
        this.userService.updateUser(this.originalName, user)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.userService.addUser(user)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
