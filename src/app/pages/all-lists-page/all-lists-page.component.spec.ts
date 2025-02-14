import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListsPageComponent } from './all-lists-page.component';

describe('ListPageComponent', () => {
  let component: AllListsPageComponent;
  let fixture: ComponentFixture<AllListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllListsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
