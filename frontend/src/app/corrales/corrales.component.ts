import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AnimalesComponent } from '../animales/animales.component';

interface Animal {
  nombre: string;
  edad: number;
  corralId: number;
  noCompatibles: number[];
}

@Component({
  selector: 'app-corrales',
  templateUrl: './corrales.component.html',
  styleUrls: ['./corrales.component.css'],
})
export class CorralesComponent implements OnInit {
  corrales: any[] = [];
  nuevoCorral = { nombre: '', capacidad: 0 };
  nuevoAnimal: Animal = { nombre: '', edad: 0, corralId: 0, noCompatibles: [] };
  mostrarFormularioCorral = false;
  mostrarFormularioAnimal = false;
  animalesDelCorral: any[] = [];
  animales: any[] = [];
  mensajeError: string | null = null;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerCorrales();
    this.obtenerAnimales();
  }

  obtenerCorrales(): void {
    // Cambiamos el endpoint a '/barnyards'
    this.http.get<any[]>('http://localhost:3000/barnyards').subscribe((data) => {
      this.corrales = data;
    });
  }

  obtenerAnimales(): void {
    // Cambiamos el endpoint a '/animals'
    this.http.get<any[]>('http://localhost:3000/animals').subscribe((data) => {
      this.animales = data;
    });
  }

  abrirFormularioAnimal() {
    this.mostrarFormularioAnimal = true;
    this.obtenerAnimales();
  }

  verAnimales(corralId: number) {
    // Cambiamos el endpoint a '/barnyards/:id/animales'
    this.http
      .get<any[]>(`http://localhost:3000/barnyards/${corralId}/animales`)
      .subscribe((animales) => {
        this.animalesDelCorral = animales;
        const dialogRef = this.dialog.open(AnimalesComponent, {
          data: { animales, corralId },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('El diálogo se cerró con resultado:', result);
        });
      });
  }

  agregarNuevoCorral() {
    this.http
      .post('http://localhost:3000/barnyards', this.nuevoCorral)
      .subscribe(() => {
        this.obtenerCorrales();
        this.mostrarFormularioCorral = false;
        this.nuevoCorral = { nombre: '', capacidad: 0 };
      });
  }

  agregarAnimalYAsociarloACorral() {
    if (!this.nuevoAnimal) {
      this.mensajeError = 'Error: Datos incompletos.';
      return;
    }


    const animalIncompatible = this.animalesDelCorral.some((animal) => {
      const noCompatiblesAnimal = Array.isArray(animal.noCompatibles)
        ? animal.noCompatibles
        : [];
      const noCompatiblesNuevoAnimal = Array.isArray(this.nuevoAnimal.noCompatibles)
        ? this.nuevoAnimal.noCompatibles
        : [];

      return (
        noCompatiblesAnimal.includes(this.nuevoAnimal.corralId) ||
        noCompatiblesNuevoAnimal.includes(animal.corralId)
      );
    });

    if (animalIncompatible) {
      this.mensajeError = 'El animal seleccionado no es compatible con el corral.';
      return;
    }

    this.mensajeError = null;


    this.http
      .post(
        `http://localhost:3000/animals/${this.nuevoAnimal.corralId}`,
        this.nuevoAnimal
      )
      .subscribe({
        next: () => {
          console.log(
            'Animal agregado al corral con ID:',
            this.nuevoAnimal.corralId
          );
          this.mostrarFormularioAnimal = false;
          this.nuevoAnimal = {
            nombre: '',
            edad: 0,
            corralId: 0,
            noCompatibles: [],
          };
          this.obtenerAnimales();
          this.obtenerCorrales();
        },
        error: (error) => {
          console.error('Error al agregar el animal:', error);
          this.mensajeError = 'Error al agregar el animal.';
        },
      });
  }

  borrarCorral(corralId: number) {

    this.http
      .delete(`http://localhost:3000/barnyards/${corralId}`)
      .subscribe(() => {
        this.obtenerCorrales();
      });
  }
}
