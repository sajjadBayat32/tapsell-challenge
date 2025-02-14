import { Component, inject } from '@angular/core';
import { ITask, TaskService } from '@shared';
import { CardItemComponent } from '../../shared/components/card-item/card-item.component';

@Component({
  selector: 'app-completed-tasks-page',
  imports: [CardItemComponent],
  templateUrl: './completed-tasks-page.component.html',
  styleUrl: './completed-tasks-page.component.scss',
})
export class CompletedTasksPageComponent {
  private readonly taskService = inject(TaskService);
  completedTasks: ITask[] = [];

  ngOnInit(): void {
    this.taskService.getAllCompletedTasks().subscribe((resp: any) => {
      this.completedTasks = resp;
    });
  }
}
