import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  markers: any;

  constructor() {

    this.markers = [
      {
        lat: 41.388814,
        lng: 2.129154,
        label: 'A'
      },
      {
        lat: 41.389431,
        lng: 2.138521,
        label: 'B'
      }
    ];
  }

  ngOnInit() {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
}
