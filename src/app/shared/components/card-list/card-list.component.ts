import { Component, inject, input, OnInit } from '@angular/core';
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
import { ListService, TaskService } from '../../services';
import { MatIconModule } from '@angular/material/icon';
import { ListFormComponent } from '../list-form/list-form.component';
import { ListStateService } from '../../services/list-state.service';
import { NotificationService } from '../../services/notification.service';
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
export class CardListComponent implements OnInit {
  listId = input.required<string>();
  title = input<string>('');
  isMain = input<boolean>(false);
  list: ITask[] = [];
  readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);
  private readonly listService = inject(ListService);
  private readonly listStateService = inject(ListStateService);
  private readonly notificationService = inject(NotificationService);

  ngOnInit(): void {
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
      data: {
        listId: this.listId(),
        isMain: this.isMain(),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const { reload } = result;
      if (reload) {
        this.getCardList();
      }
    });
  }

  onListUpdated(): void {
    this.getCardList();
  }

  editList(): void {
    const dialogRef = this.dialog.open(ListFormComponent, {
      data: { title: this.title(), listId: this.listId() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result?.reload) {
        this.listStateService.setListState = true;
      }
    });
  }

  deleteList(): void {
    if (confirm('Are you sure you want to delete this list?')) {
      this.listService.deleteListById(this.listId()).subscribe({
        next: (res) => {
          if ('error' in res) {
            this.notificationService.show(
              'An error occurred. Please try again!',
              'error'
            );
          } else {
            this.notificationService.show(
              'List Deleted successfully!',
              'success'
            );
            this.listStateService.setListState = true;
          }
        },
      });
    }
  }
}
