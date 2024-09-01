import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  original = '';
  result = [['']];
  papagoLink = `https://papago.naver.net/website?locale=ko&source=auto&target=ko&url=${encodeURIComponent(
    location.href
  )}`;

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          console.log('scroll');
          window.scrollTo(0, document.body.scrollHeight);
          window.scrollTo(0, 0);
      } catch(err) { }                 
  }

  constructor() {
    const cache = localStorage.getItem('resource');
    if (cache) {
      this.original = cache;
      this.compile();
    }
  }

  compile(): void {
    this.result = this.original
      .split('\n\n')
      .map((p: string) => p.split('\n'));

    window.scrollTo(0, document.body.scrollHeight);
  }

  onClick(): void {
    localStorage.setItem('resource', this.original);
    location.reload();
  }

  onSelect(): void {
    const node = document.querySelector('section.result');
    if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

}
