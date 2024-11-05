import { CommonModule } from '@angular/common';
import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup ,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-restaurant-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './restaurant-dialog.component.html',
  styleUrl: './restaurant-dialog.component.scss'
})
export class RestaurantDialogComponent {
  restaurantForm: FormGroup;
  isEdit: boolean;
  originalName: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RestaurantDialogComponent>,
    private restaurantService: GlobalService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      operatingHours: ['', Validators.required],
      ownedByUsername: ['']
    });

    if (this.isEdit && data.restaurant) {
      this.originalName = data.restaurant.name;
      this.restaurantForm.patchValue(data.restaurant);
    }
  }

  onSubmit() {
    if (this.restaurantForm.valid) {
      const restaurant = this.restaurantForm.value;
      
      if (this.isEdit) {
        this.restaurantService.updateRestaurant(this.originalName, restaurant)
          .subscribe(success => {
            if (success) {
              this.dialogRef.close(true);
            }
          });
      } else {
        this.restaurantService.addRestaurant(restaurant)
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
