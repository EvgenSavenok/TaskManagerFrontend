import { Routes } from '@angular/router';
import {LoginComponent} from './features/users/components/login/login.component';
import {RegisterComponent} from './features/users/components/register/register.component';
import {DeleteUserComponent} from './features/users/components/deleteUser/delete-user.component';
import {GetAllUsersComponent} from './features/users/components/usersList/get-all-users.component';
import {DashboardComponent} from './core/components/dashboard.component';
import {LogoutComponent} from './features/users/components/logout/logout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: GetAllUsersComponent },
  { path: 'delete-user/:userId', component: DeleteUserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
