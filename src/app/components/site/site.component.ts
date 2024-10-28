import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

  private apiUrl = 'https://mantenimiento-utn-frvt-production.up.railway.app'; // Cambia según tu configuración
  Site: any[] = [];

  @Output() SiteChange = new EventEmitter<any[]>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cargarSite();
  }

  cargarSite(): void {
    this.getSite().subscribe(
      (data) => {
        this.Site = data;
        this.SiteChange.emit(this.Site);
      },
      (error) => {
        console.error('Error al cargar Ubicaciones', error);
      }
    );
  }

  getSite(): Observable<any[]> {
    const token = this.cookieService.get('jwt'); // Obtener el token de la cookie
    return this.http.get<any[]>(`${this.apiUrl}/api/site`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    });
}

}





