import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent {

  private apiUrl = 'https://mantenimiento-utn-frvt-production.up.railway.app'; // Cambia según tu configuración
  Sector: any[] = [];

  @Output() SectorChange = new EventEmitter<any[]>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cargarSector();
  }

  cargarSector(): void {
    this.getSector().subscribe(
      (data) => {
        this.Sector = data;
        this.SectorChange.emit(this.Sector);
      },
      (error) => {
        console.error('Error al cargar Sectores', error);
      }
    );
  }

  getSector(): Observable<any[]> {
    const token = this.cookieService.get('jwt'); // Obtener el token de la cookie
    return this.http.get<any[]>(`${this.apiUrl}/api/sector`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

}




