import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  const mockTodo: any = [{
    description: 'Todo 1',
    dueDate: '2024-10-30 00:00:00',
    status: 'In progress'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call hidePopup', () => {
    spyOn(component, 'hidePopup').and.callThrough();
    component.hidePopup();
    expect(component.hidePopup).toHaveBeenCalled();
  });

  it('should call proceedConfirm for remove', () => {
    component.isShow = true;
    component.lists = mockTodo;
    component.idxSelected = 0;
    component.typeSelected = 'remove';
    
    spyOn(component, 'proceedConfirm').and.callThrough();
    component.proceedConfirm();
    expect(component.proceedConfirm).toHaveBeenCalled();
  });

  it('should call proceedConfirm for update status', () => {
    component.isShow = true;
    component.lists = mockTodo;
    component.idxSelected = 0;
    component.typeSelected = 'update';
    
    spyOn(component, 'proceedConfirm').and.callThrough();
    component.proceedConfirm();
    expect(component.proceedConfirm).toHaveBeenCalled();
  });

  it('should call onClose', () => {
    spyOn(component, 'onClose').and.callThrough();
    component.onClose('');
    expect(component.onClose).toHaveBeenCalled();
  });
});
