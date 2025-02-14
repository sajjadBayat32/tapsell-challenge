import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTasksPageComponent } from './daily-tasks-page.component';

describe('MainListPageComponent', () => {
  let component: DailyTasksPageComponent;
  let fixture: ComponentFixture<DailyTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTasksPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
