import { Routes } from '@angular/router';
import { CompletedListPageComponent } from './pages/completed-list-page/completed-list-page.component';
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
    component: CompletedListPageComponent,
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
