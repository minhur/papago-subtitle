import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  original = '';
  result = [['']];

  constructor() {
    const cache = localStorage.getItem('resource');
    if (cache) {
      this.original = cache;
      this.onClick();
    }
  }

  compile(): void {
    this.result = this.original
      .split('\n\n')
      .map((p: string) => p.split('\n'));
  }

  onClick(): void {
    this.compile();
    localStorage.setItem('resource', this.original);
  }
}
