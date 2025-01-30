import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispo',
  templateUrl: './dispo.page.html',
  styleUrls: ['./dispo.page.scss'],
  standalone: false,
})
export class DispoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  onButtonClick() {
    console.log('Botón clickeado');

  }
}
