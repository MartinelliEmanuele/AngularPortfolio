import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoItem } from '../../../shared/models/types';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    injector = getTestBed();
    service = TestBed.inject(TodoService);
    httpMock = injector.inject(HttpTestingController);
  });

  //verifica che non ci sono più chiamate in uscita
  afterEach(() => {
    httpMock.verify();
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  const mockServerResponse: TodoItem[] = [
    {
      "Id": 1,
      "Title": "todo 1",
      "Description": "descrizione",
      "Due": "2021-05-31T14:52:04.822Z",
      "IsComplete": false
    }
  ]

  it('getTodo() should return a list of todo items', () => {
    service.getTodo().subscribe((res)=>{
      expect(res).toEqual(mockServerResponse);
    })

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/TodoItems`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServerResponse);
  })

  const mockSingleTodo: TodoItem = {
    "Id": 1,
    "Title": "todo 1",
    "Description": "descrizione",
    "Due": "2021-05-31T14:52:04.822Z",
    "IsComplete": false
  }

  it('getSingleTodo() should return a single todo item', () => {
    service.getSingleTodo(1).subscribe((res)=>{
      expect(res).toEqual(mockSingleTodo);
    })

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/TodoItems/${mockSingleTodo.Id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSingleTodo);
  })

  const mockPostData: TodoItem = {
    "Id": 0,
    "Title": "Titolo",
    "Description": "descrizione",
    "Due": "2021-05-31T14:52:04.822Z",
    "IsComplete": false
  }

  it('insertTodo() should POST and return data', () => {
    service.insertTodo(mockPostData).subscribe((res) => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/TodoItems`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPostData);
  });

  it('updateTodo() should PUT and return no data', () => {
    service.updateTodo(mockSingleTodo).subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/TodoItems/${mockSingleTodo.Id}`);
    expect(req.request.method).toBe('PUT');
    req.flush([]);
  });

  it('deleteTodo() should DELETE and return data', () => {
    service.deleteTodo(mockSingleTodo.Id).subscribe((res) => {
      expect(res).toEqual(mockSingleTodo);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/TodoItems/${mockSingleTodo.Id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSingleTodo);
  });

});
