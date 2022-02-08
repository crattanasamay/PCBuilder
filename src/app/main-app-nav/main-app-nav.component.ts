import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-app-nav',
  templateUrl: './main-app-nav.component.html',
  styleUrls: ['./main-app-nav.component.scss']
})
export class MainAppNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
  
  goToPcBuilder() {
    this.router.navigateByUrl('/build-pc');
  }

  goToSavedPcBuilds() {
    this.router.navigateByUrl('/saved-pc-builds')
  }

}
