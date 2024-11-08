import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDialogComponent } from './restaurant-dialog.component';

describe('RestaurantDialogComponent', () => {
  let component: RestaurantDialogComponent;
  let fixture: ComponentFixture<RestaurantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
