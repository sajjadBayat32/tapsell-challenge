import { Component, inject, input } from '@angular/core';

import { Router } from '@angular/router';
import {
  CardFormComponent,
  IList,
  ITask,
  ListService,
  TaskService,
} from '@shared';
import { ListStateService } from '../../shared/services/list-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getAllLists().subscribe((resp) => {
      console.log(resp);
      this.list = resp;
    });
  }

  viewCardList(cardId: string | null): void {
    this.router.navigate(['/list', cardId]);
  }

  addCard(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      data: {
        listId: this.listId(),
        isMain: this.isMain(),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.reload) {
      }
    });
  }
}
