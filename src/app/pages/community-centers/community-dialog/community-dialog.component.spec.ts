import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDialogComponent } from './community-dialog.component';

describe('CommunityDialogComponent', () => {
  let component: CommunityDialogComponent;
  let fixture: ComponentFixture<CommunityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
