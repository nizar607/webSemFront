import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { DonationDialogComponent } from './donation-dialog/donation-dialog.component';

import {  MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
export interface Donation {
  id: string;
  donationDate: string;
  donationAmount: number; // Change to number for better handling
}

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
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
    MatMenuModule,
  ],
})
export class DonationsComponent implements OnInit {
  donations: Donation[] = [];
  filteredDonations: Donation[] = [];
  searchTerm: string = '';

  constructor(
    private donationService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    this.donationService.getAllDonations().subscribe(
      data => {
        this.donations = data;
        this.filterDonations();
      }
    );
  }

  filterDonations() {
    if (!this.searchTerm) {
      this.filteredDonations = this.donations;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredDonations = this.donations.filter(donation => 
      donation.id.toLowerCase().includes(search) ||
      donation.donationDate.toLowerCase().includes(search) ||
      donation.donationAmount.toString().toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDonations();
      }
    });
  }

  openEditDialog(donation: Donation) {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '500px',
      data: { isEdit: true, donation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDonations();
      }
    });
  }

  confirmDelete(donation: Donation) {
    if (confirm(`Are you sure you want to delete ${donation.id}?`)) {
      this.donationService.deleteDonation(donation.id).subscribe(
        success => {
          if (success) {
            this.loadDonations();
          }
        }
      );
    }
  }
}
