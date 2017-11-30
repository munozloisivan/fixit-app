import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   /* const acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(){
        /!* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel *!/
        this.classList.toggle('active');

        /!* Toggle between hiding and showing the active panel *!/
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      };
    }*/
  }
}

