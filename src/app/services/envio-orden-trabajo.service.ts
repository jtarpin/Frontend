import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioOrdenTrabajoService {

  baseUrl: string = 'http://localhost:3011';
  

  constructor(private http: HttpClient) { }

    
  enviarFomularioOrdenTrabajo(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/envioOrdenTrabajo`, data);
  }


}
