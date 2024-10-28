import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-edifice',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  templateUrl: './edifice.component.html',
  styleUrl: './edifice.component.css'
})
export class EdificeComponent implements OnInit {

    private apiUrl = 'https://mantenimiento-utn-frvt-production.up.railway.app'; // Cambia según tu configuración
    Edifices: any[] = [];

    @Output() EdificesChange = new EventEmitter<any[]>();



    constructor(private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(): void {
      this.cargarEdifices();
    }

    cargarEdifices(): void {
      this.getEdifices().subscribe(
        (data) => {
          this.Edifices = data;
          this.EdificesChange.emit(this.Edifices);
        },
        (error) => {
          console.error('Error al cargar Edificios', error);
        }
      );
    }

    getEdifices(): Observable<any[]> {
      const token = this.cookieService.get('jwt'); // Obtener el token de la cookie
      return this.http.get<any[]>(`${this.apiUrl}/api/edifice`, {
          headers: {
              'Authorization': `Bearer ${token}`
          },
          withCredentials: true
      });
  }

  }
