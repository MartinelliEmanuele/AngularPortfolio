import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoItem } from 'src/app/modules/shared/models/types';
import Swal from 'sweetalert2';
import { TodoService } from '../../modules/core/services/todo/todo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions: Subscription[] = []
  items: TodoItem[] = [];
  minDate = moment();

  formTodo: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    Description: new FormControl('', Validators.maxLength(255)),
    Due: new FormControl(null),
    IsComplete: new FormControl(false)
  });

  //variabili per tabella contenuti
  columns: string[] = ['Id', 'Title', 'Description', 'Due', 'IsCompleted', 'Actions'];

  constructor(private todoService: TodoService) {

  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getTodos()
  }

  //Recupera la lista dei todo
  getTodos(): void {
    this.subscriptions.push(
      this.todoService.getTodo().subscribe(
        (res) => this.items = res ? res : [],
        (error) => { console.error(error); Swal.fire("Error", "The application was unable to receive the todos", "error") })
    );
  }

  //Registra un nuovo todo se non esiste, altrimenti lo modifica
  sendTodo(): void {
    if (!this.formTodo.value.Id) {
      this.subscriptions.push(
        this.todoService.insertTodo(this.formTodo.value).subscribe(
          (result) => {
            if (result) {
              Swal.fire("Created", "Todo successfully created", "success")
            }
          },
          (error) => {
            console.error(error);
            Swal.fire("Error", "Error occurred creating the todo", "error");
          },
          () => {
            this.getTodos();
            this.resetForm();
          }
        )
      )
    }
    else {
      this.subscriptions.push(
        this.todoService.updateTodo(this.formTodo.value).subscribe(
          () => {
            Swal.fire("Edited", "Todo successfully edited", "success")
          },
          (error) => {
            console.error(error);
            Swal.fire("Error", "Error occurred editing the todo", "error");
          },
          () => {
            this.getTodos();
            this.resetForm();
          }
        )
      )
    }
  }

  //Elimina il todo
  deleteTodo(todo: TodoItem): void {
    Swal.fire({
      title: "Conferma",
      text: `Sei sicuro di eliminare il todo ${todo.Title}?`,
      showCancelButton: true,
      cancelButtonText: "Annulla",
      confirmButtonText: "Elimina Todo"
    }).then(response => {
      if (response.isConfirmed) {
        this.subscriptions.push(
          this.todoService.deleteTodo(todo.Id).subscribe(
            (res) => {
              if (res) {
                Swal.fire("Deleted", "Todo successfully deleted", "success");
              }
            },
            (error) => {
              console.error(error);
              Swal.fire("Error", "Error occurred deleting the todo");
            },
            () => this.getTodos()
          )
        )
      }
    })
  }

  prepareEditFields(todo: TodoItem) {
    this.formTodo.setValue(todo);
  }

  resetForm() {
    this.formTodo.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
