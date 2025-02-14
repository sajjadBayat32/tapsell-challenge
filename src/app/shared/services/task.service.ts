import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ITask } from '../models';
import { Observable } from 'rxjs';
import { IError } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private baseHttp: HttpClient) {}

  getAllTasks() {
    return this.baseHttp.get(environment.baseUrl + 'tasks');
  }

  insertTask(task: ITask | IError) {
    return this.baseHttp.post(environment.baseUrl + 'tasks', task);
  }

  findTaskByListId(listId: string): Observable<ITask[]> {
    return this.baseHttp.get<ITask[]>(
      environment.baseUrl + 'tasks/query/' + listId
    );
  }

  findTaskById(taskId: string) {
    return this.baseHttp.get(environment.baseUrl + 'tasks/' + taskId);
  }

  updateTaskById(taskId: string, task: Omit<ITask | IError, 'id'>) {
    return this.baseHttp.put(environment.baseUrl + 'tasks/' + taskId, task);
  }

  deleteTaskById(taskId: string) {
    return this.baseHttp.delete(environment.baseUrl + 'tasks/' + taskId);
  }

  getAllCompletedTasks() {
    return this.baseHttp.get(environment.baseUrl + 'compeleted');
  }
}
