import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css'],
})
export class AnimalesComponent implements OnInit {
  animales: any[] = [];
  animalEditando: any | null = null;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.animales = data.animales;
  }

  ngOnInit(): void {
    if (!this.animales || this.animales.length === 0) {
      this.obtenerAnimalesPorCorral(this.data.corralId);
    }
  }

  obtenerAnimalesPorCorral(corralId: number): void {
    this.http
      .post<any[]>(`http://localhost:3000/barnyards/${corralId}/animales`, {})
      .subscribe(
        (data) => {
          this.animales = data;
        },
        (error) => {
          console.error('Error al obtener animales:', error);
        }
      );
  }

  editarAnimal(animalId: number): void {
    this.animalEditando = this.animales.find((a) => a.id === animalId);
  }

  guardarCambios(animalId: number): void {
    this.http
      .put(`http://localhost:3000/animals/${animalId}`, this.animalEditando)
      .subscribe(
        () => {
          this.obtenerAnimalesPorCorral(this.data.corralId);
          this.animalEditando = null;
        },
        (error) => {
          console.error('Error al actualizar el animal:', error);
        }
      );
  }

  cancelarEdicion(): void {
    this.animalEditando = null;
  }

  borrarAnimal(animalId: number): void {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este animal?');
    if (confirm) {
      this.http.delete(`http://localhost:3000/animals/${animalId}`).subscribe({
        next: () => {
          this.obtenerAnimalesPorCorral(this.data.corralId);
        },
        error: (error) => {
          console.error('Error al eliminar el animal:', error);
        }
      });
    }
  }
  
}
