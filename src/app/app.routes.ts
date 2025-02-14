import { Routes } from '@angular/router';
import { DailyTasksPageComponent } from './pages/daily-tasks-page/daily-tasks-page.component';
import { CompletedListPageComponent } from './pages/completed-list-page/completed-list-page.component';
import { AllListsPageComponent } from './pages/all-lists-page/all-lists-page.component';
import { CardListComponent } from '@shared';
import { SingleListPageComponent } from './pages/single-list-page/single-list-page.component';

export const routes: Routes = [
  // {
  //   path: 'main',
  //   component: MainListPageComponent,
  // },
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
    pathMatch: 'full', // Ensures the default route goes to 'main'
  },
  {
    path: '**',
    redirectTo: 'main', // Wildcard for unknown routes
  },
];
