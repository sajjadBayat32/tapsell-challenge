import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedListPageComponent } from './completed-list-page.component';

describe('CompletedListPageComponent', () => {
  let component: CompletedListPageComponent;
  let fixture: ComponentFixture<CompletedListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
