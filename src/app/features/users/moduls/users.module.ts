import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, LoginComponent],
  exports: [LoginComponent]
})

export class UsersModule {}
