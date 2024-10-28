import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgMaterialModule } from './shared/material/ng-material.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgMaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mantenimiento-utn-front';
}
