import { Component, inject, input, OnChanges } from '@angular/core';
import { ITask } from '../../models';
import { CardItemComponent } from '../card-item/card-item.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services';
import { MatIconModule } from '@angular/material/icon';

import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-card-list',
  imports: [
    CardItemComponent,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnChanges {
  listId = input.required<string>();
  title = input<string>('');
  isMain = input<boolean>(false);
  list: ITask[] = [];
  readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);

  ngOnChanges(): void {
    this.getCardList();
  }

  getCardList(): void {
    this.taskService.findTaskByListId(this.listId()).subscribe((resp) => {
      this.list = resp;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }

  addCard(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      data: { list: this.listId() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.reload) {
        this.getCardList();
      }
    });
  }

  onListUpdated(): void {
    this.getCardList();
  }
}
