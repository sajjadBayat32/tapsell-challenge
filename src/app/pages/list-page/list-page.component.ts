import { Component, inject, input } from '@angular/core';

import { Router } from '@angular/router';
import { IList, ListService } from '@shared';
import { ListStateService } from '../../shared/services/list-state.service';

import { ListFormComponent } from '../../shared/components/list-form/list-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list-page',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  listId = input.required<string>();
  title = input<string>('');
  isMain = input<boolean>(false);
  list: IList[] = [];

  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly listService = inject(ListService);
  private readonly listStateService = inject(ListStateService);

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getAllLists().subscribe((resp) => {
      this.list = resp;
    });
  }

  viewCardList(cardId: string | null): void {
    this.router.navigate(['/list', cardId]);
  }

  addList(): void {
    const dialogRef = this.dialog.open(ListFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const { reload } = result;
      if (reload) {
        this.listStateService.setListState = true;
      }
    });
  }
}
