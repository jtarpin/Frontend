import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnviarDatosService } from '../../auth/enviar-datos.service';
import { emailPattern, passwordPattern } from '../../auth/validators/validators';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
  ],
  providers: [EnviarDatosService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  formRegistro: FormGroup;
  

  constructor(private formbuilder: FormBuilder, private enviarDatosServicio:EnviarDatosService) {

    //FORMULARIO
    this.formRegistro = this.formbuilder.group({

      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],

      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],

      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40), Validators.pattern(emailPattern)]],

      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(passwordPattern)]],

    });

  }







  enviarDatos() {

    if (this.formRegistro.valid) {

      this.enviarDatosServicio.enviarFormularioRegistro(this.formRegistro.value).subscribe({
        next: (response) => {
          //MANEJAR RESPUESTA EXITOSA
          alert(JSON.stringify(response));
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          console.info('Enviado con exito.');
        },
      });

    } else {
      console.log(this.formRegistro.value)
      console.warn('Datos no enviados, verifique los requisitos o contacte al administrador.');
    }

  }

}
