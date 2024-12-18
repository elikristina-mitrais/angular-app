import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const mockTodo: any = [{
    description: 'Todo 1',
    dueDate: '2024-10-30 00:00:00',
    status: 'In progress'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.todoForm.setValue({
      description: "todo 2",
      dueDate: "2026-12-30 00:00:00",
      fileUpload: null
    });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call onSubmit with error back date', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.todoForm.setValue({
      description: "todo 2",
      dueDate: "2024-01-30 00:00:00",
      fileUpload: null
    });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call removeTodo when not login yet', () => {
    spyOn(component, 'removeTodo').and.callThrough();
    component.removeTodo(0);
    expect(component.removeTodo).toHaveBeenCalled();
  });

  it('should call removeTodo when login', () => {
    component.token = 'qwerty';
    spyOn(component, 'removeTodo').and.callThrough();
    component.removeTodo(0);
    expect(component.removeTodo).toHaveBeenCalled();
  });

  it('should call editTodo when not login yet', () => {
    spyOn(component, 'editTodo').and.callThrough();
    component.lists = mockTodo;
    component.editTodo(0);
    expect(component.editTodo).toHaveBeenCalled();
  });

  it('should call editTodo when login', () => {
    component.token = 'qwerty';
    spyOn(component, 'editTodo').and.callThrough();
    component.lists = mockTodo;
    component.editTodo(0);
    expect(component.editTodo).toHaveBeenCalled();
  });

  it('should call updateStatus when not login yet', () => {
    spyOn(component, 'updateStatus').and.callThrough();
    component.updateStatus(0);
    expect(component.updateStatus).toHaveBeenCalled();
  });

  it('should call updateStatus when login', () => {
    component.token = 'qwerty';
    spyOn(component, 'updateStatus').and.callThrough();
    component.updateStatus(0);
    expect(component.updateStatus).toHaveBeenCalled();
  });

  it('should call resetPopup', () => {
    spyOn(component, 'resetPopup').and.callThrough();
    component.resetPopup({});
    expect(component.resetPopup).toHaveBeenCalled();
  });

  it('should call resetLogin', () => {
    spyOn(component, 'resetLogin').and.callThrough();
    component.resetLogin();
    expect(component.resetLogin).toHaveBeenCalled();
  });

  it('should call uploadFile', () => {
    const element = fixture.nativeElement;
    const input = element.querySelector('#file-upload');
    spyOn(component, 'uploadFile');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.uploadFile).toHaveBeenCalled();
  });
});
