import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantDialogComponent } from './restaurant-dialog/restaurant-dialog.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';



export interface Restaurant {
  name: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
  ownedByUsername?: string;
}

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    HttpClientModule,
    
    // Angular Material Modules
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})

export class RestaurantsComponent {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';

  constructor(
    private restaurantService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurants = data;
        this.filterRestaurants();
      }
    );
  }

  filterRestaurants() {
    if (!this.searchTerm) {
      this.filteredRestaurants = this.restaurants;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(search) ||
      restaurant.address.toLowerCase().includes(search) ||
      restaurant.contactNumber.toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(RestaurantDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRestaurants();
      }
    });
  }

  openEditDialog(restaurant: Restaurant) {
    const dialogRef = this.dialog.open(RestaurantDialogComponent, {
      width: '500px',
      data: { isEdit: true, restaurant }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRestaurants();
      }
    });
  }

  confirmDelete(restaurant: Restaurant) {
    if (confirm(`Are you sure you want to delete ${restaurant.name}?`)) {
      this.restaurantService.deleteRestaurant(restaurant.name).subscribe(
        success => {
          if (success) {
            this.loadRestaurants();
          }
        }
      );
    }
  }
}