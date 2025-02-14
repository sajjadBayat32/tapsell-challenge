import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListFormComponent } from './shared/components/list-form/list-form.component';
import { IList, ListService } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { ListStateService } from './shared/services/list-state.service';
import { HeaderComponent } from './shared/layout/header/header.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HeaderComponent,
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly listService = inject(ListService);
  private readonly listStateService = inject(ListStateService);
  lists: IList[] = [];

  ngOnInit(): void {
    this.getLists();
    this.listStateService.getListStateAsObs.subscribe((state) => {
      if (state) {
        this.getLists();
        this.listStateService.setListState = false;
      }
    });
  }

  getLists(): void {
    this.listService.getAllLists().subscribe((resp) => {
      this.lists = resp;
    });
  }

  addListForm(): void {
    const dialogRef = this.dialog.open(ListFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const { reload } = result;
      if (reload) {
        this.listStateService.setListState = true;
      }
    });
  }
}
