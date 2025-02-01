import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';



interface Conductor {
  id: number;
  conductor: string;
  inicio: string;
  destino: string;
  asientosDisponibles: number;
  imagen: string;  // Agrega una propiedad para la imagen
}

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  standalone: false,
})
export class ConductorPage implements OnInit, AfterViewInit {
  isConductor: boolean = true;
  viajes: Conductor[] = [];
  nuevoViaje: Conductor = { id: 0, conductor: '', inicio: '', destino: '', asientosDisponibles: 0, imagen: '' };  // Agregado imagen
  mapa: mapboxgl.Map | null = null;

  accessToken: string = 'pk.eyJ1Ijoia2VueWkwNSIsImEiOiJjbTZqc2MydzUwNDd4MmtvYnYyZDdwZ21mIn0.vfVdysHEl-DV6oTWKSauvQ';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.listarViajes();
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = this.accessToken;
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6179919, -33.4331453],
      zoom: 10
    });
  

  
  

    // Cargar la ruta guardada desde localStorage
    const rutaGuardada = localStorage.getItem('ruta');
    if (rutaGuardada) {
      const ruta = JSON.parse(rutaGuardada);
      this.mapa.addSource('ruta', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: ruta }
      });
      this.mapa.addLayer({
        id: 'ruta',
        type: 'line',
        source: 'ruta',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#007AFF', 'line-width': 5 }
      });
    }
  }

  listarViajes(): void {
    this.http.get<Conductor[]>('https://ksb3rm3t-3000.brs.devtunnels.m/conductores')
      .subscribe(
        (data) => {
          this.viajes = data.map((viaje, index) => ({
            ...viaje,
            id: index + 1,
            asientosDisponibles: Number(viaje.asientosDisponibles)
          }));
          this.viajes.forEach(viaje => this.trazarRuta(viaje.inicio, viaje.destino));
        },
        (error) => console.error('Error al listar viajes:', error)
      );
  }

  crearViaje(): void {
    if (this.nuevoViaje.conductor && this.nuevoViaje.inicio && this.nuevoViaje.destino && this.nuevoViaje.asientosDisponibles) {
      const nuevoId = this.viajes.length > 0 ? this.viajes[this.viajes.length - 1].id + 1 : 1;
      const viajeConId = { ...this.nuevoViaje, id: nuevoId };
  
      this.http.post('https://ksb3rm3t-3000.brs.devtunnels.ms/conductores', viajeConId)
        .subscribe(
          (response) => {
            console.log('Nuevo viaje creado en la API:', response);
            this.viajes.push(viajeConId);
            this.trazarRuta(viajeConId.inicio, viajeConId.destino);
            this.nuevoViaje = { id: 0, conductor: '', inicio: '', destino: '', asientosDisponibles: 0, imagen: '' }; // Reestablecer
            
          },
          (error) => console.error('Error al crear el viaje en la API:', error)
        );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
  
  

  trazarRuta(inicio: string, destino: string): void {
    this.obtenerCoordenadas(inicio, destino).then(coords => {
      if (coords && this.mapa) {  // Check if mapa is not null
        const [origenCoords, destinoCoords] = coords;
  
        // Guardar las coordenadas en localStorage
        localStorage.setItem('origenCoords', JSON.stringify(origenCoords));
        localStorage.setItem('destinoCoords', JSON.stringify(destinoCoords));
  
        this.agregarMarcador(origenCoords, 'Origen');
        this.agregarMarcador(destinoCoords, 'Destino');
        this.dibujarRuta(origenCoords, destinoCoords);
      }
    });
  }
  

  async obtenerCoordenadas(inicio: string, destino: string): Promise<[number[], number[]] | null> {
    const origenCoords = await this.geocodificarDireccion(inicio);
    const destinoCoords = await this.geocodificarDireccion(destino);
    if (origenCoords && destinoCoords) {
      return [origenCoords, destinoCoords];
    }
    return null;
  }

  async geocodificarDireccion(direccion: string): Promise<number[] | null> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${this.accessToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.features.length > 0 ? data.features[0].center : null;
    } catch (error) {
      console.error('Error en la geocodificación:', error);
      return null;
    }
  }

  dibujarRuta(origen: number[], destino: number[]): void {
    if (!this.mapa) return;  // Early return if mapa is null
    
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origen[0]},${origen[1]};${destino[0]},${destino[1]}?geometries=geojson&access_token=${this.accessToken}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const ruta = data.routes[0].geometry;
        
        // Guardar la ruta en localStorage
        localStorage.setItem('ruta', JSON.stringify(ruta));
  
        // Ensure `this.mapa` is not null before performing actions on it
        if (this.mapa) {
          if (this.mapa.getSource('ruta')) {
            this.mapa.removeLayer('ruta');
            this.mapa.removeSource('ruta');
          }
          
          this.mapa.addSource('ruta', {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: ruta }
          });
  
          this.mapa.addLayer({
            id: 'ruta',
            type: 'line',
            source: 'ruta',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#007AFF', 'line-width': 5 }
          });
        }
      })
      .catch(error => console.error('Error al obtener la ruta:', error));
  }
  
  

  agregarMarcador(coordenadas: number[], tipo: string): void {
    if (this.mapa && coordenadas && coordenadas.length === 2) {  // Check if mapa is not null
      new mapboxgl.Marker()
        .setLngLat([coordenadas[0], coordenadas[1]])
        .setPopup(new mapboxgl.Popup().setText(`${tipo}: ${coordenadas[0]}, ${coordenadas[1]}`))
        .addTo(this.mapa);
    }
  }

  
  
  toggleRole(): void {
    this.isConductor = !this.isConductor;
  }
}
