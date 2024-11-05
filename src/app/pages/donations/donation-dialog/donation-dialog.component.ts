import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './donation-dialog.component.html',
  styleUrl: './donation-dialog.component.scss'
})
export class DonationDialogComponent {

  donationForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';
  id:string='';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DonationDialogComponent>,
    private donationService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.donationForm = this.fb.group({
      id: [{ value: data.donation?.id || '', disabled: this.isEdit }],
      donationDate: [data.donation?.donationDate || '', Validators.required],
      donationAmount: [data.donation?.donationAmount || '', [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit && data.donation) {
      this.id = data.donation.id;
      this.donationForm.patchValue(data.donation);
    }
  }

  onSubmit() {
    if (this.donationForm.valid) {
      const donation = this.donationForm.value;
      
      if (this.isEdit) {
        this.donationService.updateDonation(this.id, donation)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.donationService.addDonation(donation)
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
