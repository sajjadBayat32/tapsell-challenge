import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardListComponent } from './shared/components/card-list/card-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListFormComponent } from './shared/components/list-form/list-form.component';
import { IList, ListService } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { ListStateService } from './shared/services/list-state.service';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MainListPageComponent } from './pages/main-list-page/main-list-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HeaderComponent,
    CardListComponent,
    MainListPageComponent,
    ListPageComponent,
  ],
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
