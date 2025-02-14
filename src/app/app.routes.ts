import { Routes } from '@angular/router';
import { MainListPageComponent } from './pages/main-list-page/main-list-page.component';
import { CompletedListPageComponent } from './pages/completed-list-page/completed-list-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

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
    component: ListPageComponent,
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
