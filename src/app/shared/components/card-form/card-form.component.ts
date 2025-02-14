import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Component, Inject, inject, input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IForm, ITask, FieldErrorMessageComponent, TaskService } from '@shared';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    // FieldErrorMessageComponent,
    MatButton,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent {
  listId: string = '';
  taskId: string | null = null;
  form: FormGroup<FormType> = new FormGroup(formFields());
  formSubscription: Subscription | null = null;

  taskService = inject(TaskService);
  dialogRef = inject(MatDialogRef<CardFormComponent>);
  private readonly notificationService = inject(NotificationService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public taskData: any | null
  ) {
    this.listId = taskData.list;
    if (taskData._id) {
      this.taskId = taskData._id;
      this.form = new FormGroup(formFields(taskData));
    }
  }

  onSubmit(): void {
    const { title = '', description = '' } = this.form.value;
    if (this.taskId) {
      this.taskService
        .updateTaskById(this.taskId, { title, description })
        .subscribe({
          next: (res) => {
            if ('error' in res) {
              this.notificationService.show(
                'An error occurred. Please try again!',
                'error'
              );
            } else {
              this.notificationService.show(
                'Card data updated successfully!',
                'success'
              );
              this.dialogRef.close({ reload: true });
            }
          },
        });
    } else {
      this.taskService
        .insertTask({
          title,
          description,
          list: this.listId,
        })
        .subscribe({
          next: (res) => {
            if ('error' in res) {
              this.notificationService.show(
                'An error occurred. Please try again!',
                'error'
              );
            } else {
              this.notificationService.show(
                'Card added successfully!',
                'success'
              );
              this.dialogRef.close({ reload: true });
            }
          },
        });
    }
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close({ reload: false });
  }
}

type BaseTask = Pick<ITask, '_id' | 'title' | 'description'>;
type FormType = IForm<BaseTask>;

function formFields(data: BaseTask | null = null): FormType {
  return {
    title: new FormControl(data?.title || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(data?.description || '', {
      nonNullable: true,
      validators: [],
    }),
  };
}
