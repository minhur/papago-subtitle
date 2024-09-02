import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  original = '';
  result = [['']];
  papagoLink = `https://papago.naver.net/website?locale=ko&source=auto&target=ko&url=${encodeURIComponent(
    location.href
  )}`;

  ngOnInit() {        
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500); 
      this.onSelect();
    }, 500);     
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
      setTimeout(() => {
        document.execCommand("copy");
        console.log('copied');
      }, 500); 
    }
  }

}
