import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent, IList, ListService } from '@shared';

@Component({
  selector: 'app-main-list-page',
  imports: [CardListComponent],
  templateUrl: './main-list-page.component.html',
  styleUrl: './main-list-page.component.scss',
})
export class MainListPageComponent implements OnInit {
  private readonly listService = inject(ListService);
  mainCard: IList | undefined;

  ngOnInit(): void {
    this.listService.getMainLst().subscribe((data) => {
      this.mainCard = data;
    });
  }
}
