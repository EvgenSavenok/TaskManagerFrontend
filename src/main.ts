import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../../TaskManagerFrontend/src/app/app.config';
import { AppComponent } from '../../TaskManagerFrontend/src/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
