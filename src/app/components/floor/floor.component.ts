import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent {

  private apiUrl = 'https://mantenimiento-utn-frvt-production.up.railway.app'; // Cambia según tu configuración
  Floor: any[] = [];

  @Output() PisosChange = new EventEmitter<any[]>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cargarPisos();
  }

  cargarPisos(): void {
    this.getPisos().subscribe(
      (data) => {
        this.Floor = data;
        this.PisosChange.emit(this.Floor);
      },
      (error) => {
        console.error('Error al cargar Edificios', error);
      }
    );
  }

  getPisos(): Observable<any[]> {
    const token = this.cookieService.get('jwt'); // Obtener el token de la cookie
    return this.http.get<any[]>(`${this.apiUrl}/api/floor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

}


