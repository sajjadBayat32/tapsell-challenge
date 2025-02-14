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
export class ListPageComponent {}
