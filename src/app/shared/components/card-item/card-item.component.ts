import { ITask } from '../../models';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatDialogModule,
    MatButton,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  data = input.required<ITask>();
  @Output() listUpdated = new EventEmitter<ITask[]>();
  private readonly notificationService = inject(NotificationService);

  readonly dialog = inject(MatDialog);
  taskService = inject(TaskService);
  snackBar = inject(MatSnackBar);

  editCard(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      data: this.data(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.reload) {
        const listId = this.data()?.list ?? '';
        if (listId) {
          this.taskService.findTaskByListId(listId).subscribe((resp) => {
            this.listUpdated.emit(resp);
          });
        }
      }
    });
  }

  deleteCard(cardId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTaskById(cardId).subscribe({
        next: (res) => {
          if ('error' in res) {
            this.notificationService.show(
              'An error occurred. Please try again!',
              'error'
            );
          } else {
            this.notificationService.show(
              'Card Deleted successfully!',
              'success'
            );
            this.listUpdated.emit();
          }
        },
      });
    }
  }
  toggleDone(isChecked: boolean): void {
    this.taskService
      .updateTaskById(this.data()?._id ?? '', { done: isChecked })
      .subscribe({
        next: (res) => {
          if ('error' in res) {
            this.notificationService.show(
              'An error occurred. Please try again!',
              'error'
            );
          } else {
            this.notificationService.show('Task Done!', 'success');
            this.listUpdated.emit();
          }
        },
      });
  }
}
