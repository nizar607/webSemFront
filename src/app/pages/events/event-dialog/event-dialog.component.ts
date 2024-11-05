import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss'
})
export class EventDialogComponent {

  eventForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';
  id: string='';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventDialogComponent>,
    private eventService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.eventForm = this.fb.group({
      id: [{ value: data.event?.id || '', disabled: this.isEdit }],
      eventDate: [data.event?.eventDate || '', Validators.required],
      eventDuration: [data.event?.eventDuration || '', [Validators.required, Validators.min(1)]],
    });

    if (this.isEdit && data.event) {
      this.id = data.event.id;
      this.eventForm.patchValue(data.event);
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const event = this.eventForm.value;
      
      if (this.isEdit) {
        this.eventService.updateEvent(this.id, event)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.eventService.addEvent(event)
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
