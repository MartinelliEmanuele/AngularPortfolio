import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from 'src/app/modules/shared/models/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodo(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${environment.apiBaseUrl}/TodoItems`);
  }

  getSingleTodo(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${environment.apiBaseUrl}/TodoItems/${id}`);
  }

  insertTodo(todo: TodoItem): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/TodoItems`, todo);
  }

  updateTodo(todo: TodoItem): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/TodoItems/${todo.Id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/TodoItems/${id}`);
  }
}
