import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false,
})
export class MapaPage implements OnInit {

  mapa: mapboxgl.Map;

  constructor() {
    this.mapa = {} as mapboxgl.Map;
   }

 

  ngOnInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia2VueWkwNSIsImEiOiJjbTZqc2MydzUwNDd4MmtvYnYyZDdwZ21mIn0.vfVdysHEl-DV6oTWKSauvQ';

    // Crear el mapa
    this.mapa= new mapboxgl.Map({
      container: 'mapa-mapbox', // Asegúrate de que este ID existe en tu HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6179919,-33.4331453], // Coordenadas iniciales (ejemplo)
      zoom: 9
    });
    
  }

}
