import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { HttpClient } from '@angular/common/http';
// import { Message } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer')
  public sidenav!: MatSidenav;
  
  // hello$ = this.http.get<Message>('/api/hello');
  constructor() {}

  toggleDrawer(value: boolean) {
    this.sidenav.toggle()
  }
}
