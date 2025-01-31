import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false,
})
export class MapaPage implements OnInit {

  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2VueWkwNSIsImEiOiJjbTZqc2MydzUwNDd4MmtvYnYyZDdwZ21mIn0.vfVdysHEl-DV6oTWKSauvQ';

    // Crear el mapa
    const map = new mapboxgl.Map({
      container: 'map', // Asegúrate de que este ID existe en tu HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Coordenadas iniciales (ejemplo)
      zoom: 9
    });
    
  }

}
