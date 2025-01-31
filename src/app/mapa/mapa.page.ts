import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

declare var require: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  mapa: mapboxgl.Map;
  MapboxGeocoder: any;

  constructor() {
    this.mapa = {} as mapboxgl.Map;
    this.MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
  }

  ngOnInit() {
    // Asegúrate de poner tu token de Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia2VueWkwNSIsImEiOiJjbTZqc2MydzUwNDd4MmtvYnYyZDdwZ21mIn0.vfVdysHEl-DV6oTWKSauvQ'; 

    // Crear el mapa
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox', // Contenedor donde el mapa se va a renderizar
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6144175, -33.4317635], // Coordenadas iniciales
      zoom: 16.54
    });

    // Agregar controles de navegación
    this.mapa.addControl(new mapboxgl.NavigationControl());

    // Agregar geocodificador para "De"
    const geocoderOrigen = new this.MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      placeholder: 'De...',
    });
    document.getElementById('origen')?.appendChild(geocoderOrigen.onAdd(this.mapa));

    // Agregar geocodificador para "Hacia"
    const geocoderDestino = new this.MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      placeholder: 'Hacia...',
    });
    document.getElementById('destino')?.appendChild(geocoderDestino.onAdd(this.mapa));
  }
}
