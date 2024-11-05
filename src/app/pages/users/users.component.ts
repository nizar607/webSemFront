import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
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

export interface User {
  id: string;
  role: string;
  username: string;
}

@Component({
  selector: 'app-users',
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

    UserDialogComponent
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(
    private userService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.filterUsers();
      }
    );
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.id.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { isEdit: true, user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  confirmDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.id}?`)) {
      this.userService.deleteUser(user.id).subscribe(
        success => {
          if (success) {
            this.loadUsers();
          }
        }
      );
    }
  }
}
