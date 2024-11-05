import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
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

export interface Event {
  eventDuration: string;
  id: string;
  eventDate: string;
}

@Component({
  selector: 'app-events',
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

    EventDialogComponent
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';

  constructor(
    private eventService: GlobalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      data => {
        this.events = data;
        this.filterEvents();
      }
    );
  }

  filterEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = this.events;
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event => 
      event.id.toLowerCase().includes(search) ||
      event.eventDate.toLowerCase().includes(search) ||
      event.eventDuration.toLowerCase().includes(search)
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  openEditDialog(event: Event) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '500px',
      data: { isEdit: true, event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  confirmDelete(event: Event) {
    if (confirm(`Are you sure you want to delete ${event.id}?`)) {
      this.eventService.deleteEvent(event.id).subscribe(
        success => {
          if (success) {
            this.loadEvents();
          }
        }
      );
    }
  }
}
