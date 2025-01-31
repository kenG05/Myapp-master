import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Conductor {
  id: number;  // Nuevo campo para el ID
  conductor: string;
  inicio: string;
  destino: string;
  asientosDisponibles: number;
}


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  standalone: false,
})
export class ConductorPage implements OnInit {
  // Estado de si el usuario es conductor o pasajero
  isConductor: boolean = true;
  viajes: Conductor[] = [];

  nuevoViaje: Conductor = {
    id: 0,  // Agregar un ID temporal
    conductor: '',
    inicio: '',
    destino: '',
    asientosDisponibles: 0,
  };
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarViajes();
  }
  
  listarViajes(): void {
    this.http.get<Conductor[]>('https://00kfqrfd-3000.brs.devtunnels.ms//conductores')
      .subscribe(
        (data) => {
          // Asignar un ID único a cada viaje basado en el índice
          this.viajes = data.map((viaje, index) => ({
            ...viaje,
            id: index + 1,  // Asigna el ID basado en el índice, iniciando en 1
            asientosDisponibles: Number(viaje.asientosDisponibles) // Convertir a número
          }));
          console.log('Viajes cargados:', this.viajes);
        },
        (error) => {
          console.error('Error al listar viajes:', error);
        }
      );
  }
  
  

  crearViaje(): void {
    if (this.nuevoViaje.conductor && this.nuevoViaje.inicio && this.nuevoViaje.destino && this.nuevoViaje.asientosDisponibles) {

      const nuevoId = this.viajes.length > 0 ? this.viajes[this.viajes.length - 1].id + 1 : 1;
  
      const viajeConId = {
        ...this.nuevoViaje,
        id: nuevoId,  
      };
  

      this.http.post('https://00kfqrfd-3000.brs.devtunnels.ms/', viajeConId)
        .subscribe(
          (response) => {
            console.log('Nuevo viaje creado en la API:', response);
            this.viajes.push(viajeConId);  
            this.nuevoViaje = { id: 0, conductor: '', inicio: '', destino: '', asientosDisponibles: 0 }; 
          },
          (error) => {
            console.error('Error al crear el viaje en la API:', error);
          }
        );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
}
