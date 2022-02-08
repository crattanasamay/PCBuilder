import { Component } from '@angular/core';
import { ApiService } from './_services/api.service';
import { TempDatabaseService } from './_services/temp-database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pc-builder-SPA';

  constructor(public tempDatabase: TempDatabaseService){

  }
}
