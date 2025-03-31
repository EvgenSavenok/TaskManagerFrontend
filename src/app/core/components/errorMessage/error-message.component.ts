import {Component, OnInit} from '@angular/core';
import { ErrorHandlerService } from '../../services/error-handler.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  imports: [
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  errorMessage$: any;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.errorMessage$ = this.errorHandlerService.errorMessage$;
  }
}
