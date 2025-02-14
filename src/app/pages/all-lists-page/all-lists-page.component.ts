import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IList, ListService } from '@shared';
import { ListStateService } from '../../shared/services/list-state.service';
import { ListFormComponent } from '../../shared/components/list-form/list-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-all-lists-page',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './all-lists-page.component.html',
  styleUrl: './all-lists-page.component.scss',
})
export class AllListsPageComponent {
  lists: IList[] = [];

  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly listService = inject(ListService);
  private readonly listStateService = inject(ListStateService);

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getAllLists().subscribe((resp) => {
      this.lists = resp;
    });
  }

  viewCardList(listId: string | null): void {
    this.router.navigate(['/list', listId]);
  }

  addList(): void {
    const dialogRef = this.dialog.open(ListFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const { reload } = result;
      if (reload) {
        this.listStateService.setListState = true;
      }
    });
  }
}
