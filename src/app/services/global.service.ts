import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  private readonly API_URL = 'http://localhost:8080'; // Adjust this to match your backend URL

  constructor(private http: HttpClient) { }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error || error.message;
    }
    return throwError(() => errorMessage);
  }

  // Restaurant endpoints
  getAllRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/restaurants`)
      .pipe(catchError(this.handleError));
  }

  addRestaurant(restaurantData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/restaurants`, restaurantData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  updateRestaurant(name: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/restaurants/${name}`, updatedData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteRestaurant(name: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/restaurants/${name}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Community Center endpoints
  getAllCommunityCenters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/community-centers`)
      .pipe(catchError(this.handleError));
  }

  addCommunityCenter(centerData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/community-centers`, centerData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  updateCommunityCenter(name: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/community-centers/${name}`, updatedData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteCommunityCenter(name: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/community-centers/${name}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // User endpoints
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users`)
      .pipe(catchError(this.handleError));
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, userData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  updateUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${username}`, updatedData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/${username}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Event endpoints
  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/events`)
      .pipe(catchError(this.handleError));
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/events`, eventData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  updateEvent(eventId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/events/${eventId}`, updatedData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/events/${eventId}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Donation endpoints
  getAllDonations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/donations`)
      .pipe(catchError(this.handleError));
  }

  addDonation(donationData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/donations`, donationData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  updateDonation(donationId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/donations/${donationId}`, updatedData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteDonation(donationId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/donations/${donationId}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }


    // Shelter endpoints
    getAllShelters(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API_URL}/shelters`)
        .pipe(catchError(this.handleError));
    }
  
    addShelter(shelterData: any): Observable<any> {
      return this.http.post(`${this.API_URL}/shelters`, shelterData, { responseType: 'text' })
        .pipe(catchError(this.handleError));
    }
  
    updateShelter(shelterId: string, updatedData: any): Observable<any> {
      return this.http.put(`${this.API_URL}/shelters/${shelterId}`, updatedData, { responseType: 'text' })
        .pipe(catchError(this.handleError));
    }
  
    deleteShelter(shelterId: string): Observable<any> {
      return this.http.delete(`${this.API_URL}/shelters/${shelterId}`, { responseType: 'text' })
        .pipe(catchError(this.handleError));
    }

}