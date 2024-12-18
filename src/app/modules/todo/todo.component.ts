import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { PopupComponent } from '../popup/popup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopupComponent,
    LoginComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: '*',
        transform: 'translateX(0)', opacity: 1
      })),
      transition(':enter', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: '*'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition(':leave', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  lists: any[] = [];
  token: string = '';
  isEdit: boolean = false;
  isShowPopup: boolean = false;
  isShowLogin: boolean = false;
  idxSelected: number = -1;
  typeSelected: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      dueDate: ['', [Validators.required]],
      fileUpload: [null]
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
  }

  onSubmit() {
    const post = this.todoForm.getRawValue();
    const currDate = new Date().setHours(0, 0, 0, 0);
    const newDate = new Date(post.dueDate);

    if (currDate.valueOf() > newDate.valueOf()) {
      this.todoForm.get('dueDate')?.setErrors({
        backdate: true
      });
      return;
    }

    this.lists.push({
      description: post.description,
      dueDate: post.dueDate,
      status: 'In progress'
    });
    this.todoForm.reset();
    this.isEdit = false;
  }

  removeTodo(idx: number) {
    if (this.token !== '') {
      this.isShowPopup = true;
      this.idxSelected = idx;
      this.typeSelected = 'remove';
    } else {
      this.isShowLogin = true;
    }
  }

  editTodo(idx: number) {
    if (this.token !== '') {
      this.isEdit = true;
      const post = this.lists[idx];
      this.lists.splice(idx, 1);
      this.todoForm.patchValue({
        description: post.description,
        dueDate: post.dueDate
      });
    } else {
      this.isShowLogin = true;
    }
  }

  updateStatus(idx: number) {
    if (this.token !== '') {
      this.isShowPopup = true;
      this.idxSelected = idx;
      this.typeSelected = 'update';
    } else {
      this.isShowLogin = true;
    }
  }

  resetPopup(ev: any) {
    this.isShowPopup = false;
    this.idxSelected = -1;
    this.typeSelected = '';
    this.lists = ev;
  }

  resetLogin() {
    this.isShowLogin = false;
    this.token = localStorage.getItem('token') || '';
  }

  uploadFile(ev: any) {
    if (ev.target.files[0].size > 350000) {
      this.todoForm.get('fileUpload')?.setErrors({
        size: true
      });
    }

    return;
  }
}
