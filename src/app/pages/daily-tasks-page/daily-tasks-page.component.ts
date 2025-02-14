import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent, IList, ListService } from '@shared';

@Component({
  selector: 'app-daily-tasks-page',
  imports: [CardListComponent],
  templateUrl: './daily-tasks-page.component.html',
  styleUrl: './daily-tasks-page.component.scss',
})
export class DailyTasksPageComponent implements OnInit {
  private readonly listService = inject(ListService);
  mainCard: IList | undefined;

  ngOnInit(): void {
    this.listService.getMainLst().subscribe((data) => {
      this.mainCard = data;
    });
  }
}
