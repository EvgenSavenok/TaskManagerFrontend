import {Component, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {

  }

  login() {
    const userData = { username: this.username, password: this.password };

    this.usersService.login(userData).subscribe(
      (response) => {

        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigateByUrl('/dashboard');
      },
      () => {
        alert('Не удалось Вас авторизовать');
      }
    );
  }
}
