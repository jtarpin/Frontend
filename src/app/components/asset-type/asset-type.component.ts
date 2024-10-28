import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-asset-type',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent implements OnInit {
  private apiUrl = 'https://mantenimiento-utn-frvt-production.up.railway.app'; // Cambia según tu configuración
  tiposDeActivo: any[] = [];

  @Output() tiposDeActivoChange = new EventEmitter<any[]>();



  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cargarTiposDeActivo();
  }

  cargarTiposDeActivo(): void {
    this.getTiposDeActivo().subscribe(
      (data) => {
        this.tiposDeActivo = data;
        this.tiposDeActivoChange.emit(this.tiposDeActivo);
      },
      (error) => {
        console.error('Error al cargar tipos de activo', error);
      }
    );
  }

  getTiposDeActivo(): Observable<any[]> {
    const token = this.cookieService.get('jwt'); // Obtener el token de la cookie
    return this.http.get<any[]>(`${this.apiUrl}/api/asset-type`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

}







