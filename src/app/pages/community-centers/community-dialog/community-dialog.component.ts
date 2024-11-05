import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-communityCenter-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './community-dialog.component.html',
  styleUrl: './community-dialog.component.scss'
})
export class CommunityDialogComponent {

  communityCenterForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CommunityDialogComponent>,
    private communityCenterService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.isEdit = data.isEdit;
    this.communityCenterForm = this.fb.group({
      name: [data.communityCenter?.name || '',Validators.required],
      address: [data.communityCenter?.communityCenterAddress || '', Validators.required],
      contactNumber: [data.communityCenter?.communityCenterContactNumber || '', [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit && data.communityCenter) {
      this.originalName = data.communityCenter.name;
      this.communityCenterForm.patchValue(data.communityCenter);
    }
  }

  onSubmit() {
    if (this.communityCenterForm.valid) {
      const communityCenter = this.communityCenterForm.value;
      
      if (this.isEdit) {
        this.communityCenterService.updateCommunityCenter(this.originalName, communityCenter)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.communityCenterService.addCommunityCenter(communityCenter)
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
