import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IForm, FieldErrorMessageComponent, IList, ListService } from '@shared';
import { NotificationService } from '../../services/notification.service';
import { ListStateService } from '../../services/list-state.service';

@Component({
  selector: 'app-list-form',
  imports: [
    ReactiveFormsModule,
    // FieldErrorMessageComponent,
    MatButton,
    MatDialogModule,
  ],
  templateUrl: './list-form.component.html',
  styleUrl: './list-form.component.scss',
})
export class ListFormComponent {
  form: FormGroup<FormType> = new FormGroup(formFields());
  formSubscription: Subscription | null = null;
  isEditMode = false;

  private readonly listService = inject(ListService);
  private readonly notificationService = inject(NotificationService);
  private readonly listStateService = inject(ListStateService);
  dialogRef = inject(MatDialogRef<ListFormComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; listId?: string }
  ) {
    if (data?.title && data?.listId) {
      this.isEditMode = true;
      this.form.patchValue({ title: data.title });
    }
  }

  onSubmit(): void {
    const formValue = this.form.value;
    if (this.isEditMode && this.data?.listId) {
      this.listService.updateListById(this.data.listId, formValue).subscribe({
        next: (res) => {
          if ('error' in res) {
            this.notificationService.show('Update failed!', 'error');
          } else {
            this.notificationService.show(
              'List updated successfully!',
              'success'
            );
            this.dialogRef.close({ reload: true });
          }
        },
      });
    } else {
      this.listService.InsertList(formValue).subscribe({
        next: (res) => {
          if ('error' in res) {
            this.notificationService.show(
              res.message.message || 'An error occurred!',
              'error'
            );
          } else {
            this.notificationService.show(
              'List added successfully!',
              'success'
            );
            this.listStateService.setListState = true;
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

type BaseList = Pick<IList, 'title'>;
type FormType = IForm<BaseList>;

function formFields(taskData: BaseList | null = null): FormType {
  return {
    title: new FormControl(taskData?.title || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  };
}
