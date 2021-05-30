import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/modules/shared/models/types';
import { TodoService } from '../../modules/core/services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: TodoItem[] = [];

  constructor(private todoService: TodoService) {
    todoService.getTodo().subscribe(res=>this.items=res)
  }

  ngOnInit(): void {
  }

}
