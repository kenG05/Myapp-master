import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Viaje {
  conductor: string;
  inicio: string;
  destino: string;
  asientosDisponibles: number;
}

@Component({
  selector: 'app-dispo',
  templateUrl: './dispo.page.html',
  styleUrls: ['./dispo.page.scss'],
  standalone: false,
})
export class DispoPage implements OnInit {
  viajes: Viaje[] = []; 
  viajeSeleccionado: Viaje | null = null; 
  isSearchVisible = false;
  searchQuery = '';
  cart = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.listarViajes();
  }

  listarViajes(): void {
    this.http.get<Viaje[]>('https://ksb3rm3t-3000.brs.devtunnels.ms/conductores')
      .subscribe(
        (data) => {
          this.viajes = data;

          // Sincronizar el estado de los viajes con localStorage
          const storedViajes = JSON.parse(localStorage.getItem('viajes') || '[]');
          if (storedViajes.length > 0) {
            this.viajes = this.viajes.map((viaje: Viaje) => {
              const storedViaje = storedViajes.find((v: Viaje) => v.conductor === viaje.conductor);
              if (storedViaje) {
                viaje.asientosDisponibles = storedViaje.asientosDisponibles;
              }
              return viaje;
            });
          }
        },
        (error) => {
          console.error('Error al listar viajes:', error);
        }
      );
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  
    if (!this.isSearchVisible) {
      this.searchQuery = ''; // Limpiar el campo de búsqueda
      this.listarViajes(); // Recargar los viajes originales
    }
  }
  

  performSearch() {
    if (this.searchQuery.trim() === '') {
      this.listarViajes(); 
    } else {
      this.viajes = this.viajes.filter(viaje =>
        viaje.destino.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        viaje.inicio.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  viajesFiltrados() {
    return this.viajes.filter(viaje =>
      viaje.destino.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }



  seleccionarViaje(viaje: Viaje): void {
    if (viaje.asientosDisponibles > 0) {
      this.viajeSeleccionado = viaje;
      viaje.asientosDisponibles--;  
      
      // Actualizar el estado en localStorage
      this.actualizarLocalStorage();
    } else {
      alert('No hay asientos disponibles en este viaje');
    }
  }

  actualizarLocalStorage(): void {
    const updatedViajes = this.viajes.map((viaje: Viaje) => ({
      conductor: viaje.conductor,
      inicio: viaje.inicio,
      destino: viaje.destino,
      asientosDisponibles: viaje.asientosDisponibles
    }));
    localStorage.setItem('viajes', JSON.stringify(updatedViajes));
  }

  confirmarViaje(): void {
    console.clear();  // Limpiar la consola
    alert('¡Viaje confirmado!');
    this.router.navigate(['/perfil'], { queryParams: { viaje: JSON.stringify(this.viajeSeleccionado) } });
  }
}

