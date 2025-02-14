import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../../shared/components/card-list/card-list.component';
import { ActivatedRoute } from '@angular/router';
import { IList, ListService } from '@shared';

@Component({
  selector: 'app-single-list-page',
  imports: [CardListComponent],
  templateUrl: './single-list-page.component.html',
  styleUrl: './single-list-page.component.scss',
})
export class SingleListPageComponent implements OnInit {
  listId: string | null = null;
  foundedList: IList | undefined;
  private readonly route = inject(ActivatedRoute);
  private readonly listService = inject(ListService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listId = params.get('id');
      if (this.listId) this.findList(this.listId);
    });
  }

  findList(listId: string): void {
    this.listService.findListById(listId).subscribe((resp) => {
      this.foundedList = resp;
    });
  }
}
