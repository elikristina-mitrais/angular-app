import { Routes } from '@angular/router';
import { SignupComponent } from "./modules/signup/signup.component";
import { TodoComponent } from './modules/todo/todo.component';

export const routes: Routes = [
    { path: "signup", component: SignupComponent },
    { path: "todo", component: TodoComponent }
];
