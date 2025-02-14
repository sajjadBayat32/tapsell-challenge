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
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-form',
  imports: [
    ReactiveFormsModule,
    FieldErrorMessageComponent,
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
  dialogRef = inject(MatDialogRef<ListFormComponent>);
  private readonly snackBar = inject(MatSnackBar);

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
            this.showNotification('Update failed!', 'error');
          } else {
            this.showNotification('List updated successfully!', 'success');
            this.dialogRef.close({ reload: true });
          }
        },
      });
    } else {
      this.listService.InsertList(formValue).subscribe({
        next: (res) => {
          if ('error' in res) {
            this.showNotification(
              res.message.message || 'An error occurred!',
              'error'
            );
          } else {
            this.showNotification('List added successfully!', 'success');
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

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
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
