import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShelterDialogComponent } from './shelter-dialog/shelter-dialog.component';
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



export interface Shelter {
  id:string;
  name: string;
  address: string;
  contactNumber: string;
}

@Component({
  selector: 'app-shelters',
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
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.scss'
})

export class SheltersComponent {

  shelters: Shelter[] = [];
  filteredShelters: Shelter[] = [];
  searchTerm: string = '';

  constructor(
    private shelterService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadShelters();
  }

  loadShelters() {
    this.shelterService.getAllShelters().subscribe(
      data => {
        this.shelters = data;
        this.filterShelters();
      }
    );
  }

  filterShelters() {
    if (!this.searchTerm) {
      this.filteredShelters = this.shelters;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredShelters = this.shelters.filter(shelter => 
      shelter.name.toLowerCase().includes(search) ||
      shelter.address.toLowerCase().includes(search) ||
      shelter.contactNumber.toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ShelterDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadShelters();
      }
    });
  }

  openEditDialog(shelter: Shelter) {
    const dialogRef = this.dialog.open(ShelterDialogComponent, {
      width: '500px',
      data: { isEdit: true, shelter }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadShelters();
      }
    });
  }

  confirmDelete(shelter: Shelter) {
    if (confirm(`Are you sure you want to delete ${shelter.name}?`)) {
      this.shelterService.deleteShelter(shelter.id).subscribe(
        success => {
          if (success) {
            this.loadShelters();
          }
        }
      );
    }
  }
}