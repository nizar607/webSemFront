import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterDialogComponent } from './shelter-dialog.component';

describe('ShelterDialogComponent', () => {
  let component: ShelterDialogComponent;
  let fixture: ComponentFixture<ShelterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
