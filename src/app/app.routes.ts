import { Routes } from '@angular/router';
import { CompletedTasksPageComponent } from './pages/completed-tasks-page/completed-tasks-page.component';
import { AllListsPageComponent } from './pages/all-lists-page/all-lists-page.component';

import { SingleListPageComponent } from './pages/single-list-page/single-list-page.component';
import { DailyTasksPageComponent } from './pages/daily-tasks-page/daily-tasks-page.component';

export const routes: Routes = [
  {
    path: 'main',
    component: DailyTasksPageComponent,
  },
  {
    path: 'done',
    component: CompletedTasksPageComponent,
  },
  {
    path: 'list',
    component: AllListsPageComponent,
  },
  {
    path: 'list/:id',
    component: SingleListPageComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
