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

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatDialogModule, MatButton, MatIconModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  data = input.required<ITask>();
  @Output() listUpdated = new EventEmitter<ITask[]>();

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
            this.showNotification(
              'An error occurred. Please try again!',
              'error'
            );
          } else {
            this.showNotification('Card Deleted successfully!', 'success');
            this.listUpdated.emit();
          }
        },
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
