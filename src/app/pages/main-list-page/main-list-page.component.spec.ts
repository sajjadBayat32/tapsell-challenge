import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListPageComponent } from './main-list-page.component';

describe('MainListPageComponent', () => {
  let component: MainListPageComponent;
  let fixture: ComponentFixture<MainListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
