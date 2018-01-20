import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HowtoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
