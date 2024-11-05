import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-shelter-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './shelter-dialog.component.html',
  styleUrl: './shelter-dialog.component.scss'
})
export class ShelterDialogComponent {

  shelterForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';
  id:string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShelterDialogComponent>,
    private shelterService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.shelterForm = this.fb.group({
      id: [{ value: data.shelter?.id || '', disabled: this.isEdit }],
      name: [data.shelter?.name || '', Validators.required],
      address: [data.shelter?.address || '', Validators.required ],
      contactNumber: [data.shelter?.contactNumber || '', [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit && data.shelter) {
      this.id = data.shelter.id;
      this.shelterForm.patchValue(data.shelter);
    }
  }

  onSubmit() {
    if (this.shelterForm.valid) {
      const shelter = this.shelterForm.value;
      
      if (this.isEdit) {
        this.shelterService.updateShelter(this.id, shelter)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.shelterService.addShelter(shelter)
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
