import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoItem } from '../../modules/shared/models/types';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "items" list populated or empty', () => {
    expect(component.items).toBeGreaterThanOrEqual(0);
  })

  it('should not submit the form when it\'s not valid', () => {
    expect(component.formTodo.valid).toBeFalse();
    const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    expect(element.disabled).toBeTrue();
  })

});
