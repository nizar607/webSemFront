import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommunityDialogComponent } from './community-dialog/community-dialog.component';

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

export interface CommunityCenter {

  name: string;
  address: string;
  contactNumber: string;
}

@Component({
  selector: 'app-communityCenters',
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
  templateUrl: './community-centers.component.html',
  styleUrls: ['./community-centers.component.scss']
})
export class CommunityCentersComponent {
  communityCenters: CommunityCenter[] = [];
  filteredCommunityCenters: CommunityCenter[] = [];
  searchTerm: string = '';

  constructor(
    private communityCenterService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCommunityCenters();
  }

  loadCommunityCenters() {
    this.communityCenterService.getAllCommunityCenters().subscribe(
      data => {
        this.communityCenters = data;
        this.filterCommunityCenters();
      }
    );
  }

  filterCommunityCenters() {
    if (!this.searchTerm) {
      this.filteredCommunityCenters = this.communityCenters;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredCommunityCenters = this.communityCenters.filter(communityCenter => 
      communityCenter.name.toLowerCase().includes(search) ||
      communityCenter.address.toLowerCase().includes(search) ||
      communityCenter.contactNumber.toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CommunityDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCommunityCenters();
      }
    });
  }

  openEditDialog(communityCenter: CommunityCenter) {
    const dialogRef = this.dialog.open(CommunityDialogComponent, {
      width: '500px',
      data: { isEdit: true, communityCenter }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCommunityCenters();
      }
    });
  }

  confirmDelete(communityCenter: CommunityCenter) {
    if (confirm(`Are you sure you want to delete ${communityCenter.name}?`)) {
      this.communityCenterService.deleteCommunityCenter(communityCenter.name).subscribe(
        success => {
          if (success) {
            this.loadCommunityCenters();
          }
        }
      );
    }
  }
}
