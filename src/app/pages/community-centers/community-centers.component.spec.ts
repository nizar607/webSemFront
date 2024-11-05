import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCentersComponent } from './community-centers.component';

describe('CommunityCentersComponent', () => {
  let component: CommunityCentersComponent;
  let fixture: ComponentFixture<CommunityCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
