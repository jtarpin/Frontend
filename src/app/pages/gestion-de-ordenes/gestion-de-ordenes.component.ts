import { AssetTypeComponent } from '../../components/asset-type/asset-type.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EdificeComponent } from './../../components/edifice/edifice.component';
import { EnvioOrdenTrabajoService } from '../../services/envio-orden-trabajo.service';
import { FloorComponent } from '../../components/floor/floor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '../../shared/material/ng-material.module';
import { SectorComponent } from '../../components/sector/sector.component';
import { SiteComponent } from '../../components/site/site.component';
import { TaskTypeComponent } from '../../components/task-type/task-type.component';
import { UserComponent } from "../../components/user/user.component";

import { jsPDF } from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-gestion-de-ordenes',
  standalone: true,
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,

    AssetTypeComponent,
    EdificeComponent,
    FloorComponent,
    SectorComponent,
    SiteComponent,
    TaskTypeComponent,
    UserComponent
  ],
  providers: [
    EnvioOrdenTrabajoService
  ],
  templateUrl: './gestion-de-ordenes.component.html',
  styleUrls: ['./gestion-de-ordenes.component.css']
})
export class GestionDeOrdenesComponent {

  // VARIABLES
  pdfSrc: SafeResourceUrl | undefined; // Almacena el URL del objeto para la vista previa
  formulario_OrdenTrabajo: FormGroup;
  mostrarStepper: boolean = false;
  tiposDeActivo: any[] = [];
  Edifices: any[] = [];
  Floor: any[] = [];
  Sector: any[] = [];
  Site: any[] = [];
  TaskType: any[] = [];
  User: any[] = []


  constructor(private formbuilder: FormBuilder, private sanitizer: DomSanitizer, private envioOrdenTrabajo: EnvioOrdenTrabajoService) {

    //FORMULARIO
    this.formulario_OrdenTrabajo = this.formbuilder.group({

      tipo: [''],
      edificio: [''],
      piso: [''],
      sector: [''],
      ubicacion: [''],
      tarea: [''],
      operario: [''],

    });


  }





  // METODOS PARA CARGAR LOS SELECT
  mostrarStepperHandler() {
    this.mostrarStepper = !this.mostrarStepper;
  }

  onTiposDeActivoChange(tipos: any[]) {
    this.tiposDeActivo = tipos; // Guardar los tipos de activo recibidos
  }

  onEdificesChange(tipos: any[]) {
    this.Edifices = tipos; // Guardar los tipos de activo recibidos
  }

  onPisosChange(tipos: any[]) {
    this.Floor = tipos; // Guardar los tipos de activo recibidos
  }

  onSectorChange(tipos: any[]) {
    this.Sector = tipos; // Guardar los tipos de activo recibidos
  }

  onSiteChange(tipos: any[]) {
    this.Site = tipos; // Guardar los tipos de activo recibidos
  }

  onTaskTypeChange(tipos: any[]) {
    this.TaskType = tipos; // Guardar los tipos de activo recibidos
  }

  onUserChange(tipos: any[]) {
    this.User = tipos; // Guardar los tipos de activo recibidos
  }


  ngOnInit(): void {
    // Suscribirse a cambios del formulario para actualizar la vista previa del PDF
    this.formulario_OrdenTrabajo.valueChanges.subscribe(() => {
      this.actualizarVistaPrevia();
    });
  }



  // Método para generar y visualizar el PDF
  generarPDF(): void {
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text('Orden de Trabajo', 10, 10);

    // Datos del formulario
    const datos = this.formulario_OrdenTrabajo.value;

    // Añadir los datos al PDF
    doc.setFontSize(12);
    doc.text(`Tipo de Activo: ${datos.tipo}`, 10, 30);
    doc.text(`Edificio: ${datos.edificio}`, 10, 40);
    doc.text(`Piso: ${datos.piso}`, 10, 50);
    doc.text(`Sector: ${datos.sector}`, 10, 60);
    doc.text(`Ubicación: ${datos.ubicacion}`, 10, 70);
    doc.text(`Tipo de Tarea: ${datos.tarea}`, 10, 80);
    doc.text(`Operario: ${datos.operario}`, 10, 90);

    // Visualizar el PDF en una nueva pestaña del navegador
    doc.output('dataurlnewwindow');
  }



























  // Generar el PDF para la vista previa
  actualizarVistaPrevia() {
    const datos = this.formulario_OrdenTrabajo.value;
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(16);
    doc.text('UTN Orden de Trabajo', 10, 10);

    // Información del formulario en el PDF
    doc.setFontSize(12);
    doc.text(`Tipo de Activo: ${datos.tipo}`, 10, 30);
    doc.text(`Edificio: ${datos.edificio}`, 10, 40);
    doc.text(`Piso: ${datos.piso}`, 10, 50);
    doc.text(`Sector: ${datos.sector}`, 10, 60);
    doc.text(`Ubicación: ${datos.ubicacion}`, 10, 70);
    doc.text(`Tipo de Tarea: ${datos.tarea}`, 10, 80);
    doc.text(`Operario: ${datos.operario}`, 10, 90);

    // Generar el PDF como Blob
    const pdfBlob = doc.output('blob');

    // Crear un URL seguro para la vista previa
    const pdfUrl = URL.createObjectURL(pdfBlob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  // Generar el PDF para descargar
  generarPDFDes() {
    const datos = this.formulario_OrdenTrabajo.value;
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(16);
    doc.text('UTN Orden de Trabajo', 10, 10);

    // Información del formulario en el PDF
    doc.setFontSize(12);
    doc.text(`Tipo de Activo: ${datos.tipo}`, 10, 30);
    doc.text(`Edificio: ${datos.edificio}`, 10, 40);
    doc.text(`Piso: ${datos.piso}`, 10, 50);
    doc.text(`Sector: ${datos.sector}`, 10, 60);
    doc.text(`Ubicación: ${datos.ubicacion}`, 10, 70);
    doc.text(`Tipo de Tarea: ${datos.tarea}`, 10, 80);
    doc.text(`Operario: ${datos.operario}`, 10, 90);

    // Descargar el PDF
    doc.save('orden_de_trabajo.pdf');
  }







  onSubmit() {

    if (this.formulario_OrdenTrabajo.valid) {

      this.envioOrdenTrabajo.enviarFomularioOrdenTrabajo(this.formulario_OrdenTrabajo.value).subscribe({
        next: (response: any) => {
          //MANEJAR RESPUESTA EXITOSA
          alert(JSON.stringify(response));
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          console.info('Enviado con exito.');
        },
      });

    } else {
      // console.log(this.formRegister.value)
      console.warn('Datos no enviados, verifique los requisitos o contacte al administrador.');
    }

  }

}

