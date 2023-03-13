import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehiculo } from 'src/app/models/Vehiculo';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit{

  fgValidacion: FormGroup = this.fb.group({
    placa: [''],
    color: [''],
    marca: [''],
    modelo: [''],
    estado: [''],
    descripcion: [''],
    sede: [''],
    impuestos: [''],
    año_vehiculo: [''],
    año_compra:[''],
    numero_chazis:[''],
    numero_motor:['']

  })


  constructor(
    private activarPanel: ActivarPanelService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private vehiculoServices: VehiculoService
  ){

  }

  ngOnInit(): void {
    
  }


  cerrarPanel(){
    this.activarPanel.$activarPanelCrear.emit(false)
  }

  crearVehiculo(){
    if(
      this.fgValidacion.controls['placa'].value === '' ||
      this.fgValidacion.controls['color'].value === '' ||
      this.fgValidacion.controls['marca'].value === '' ||
      this.fgValidacion.controls['modelo'].value === '' ||
      this.fgValidacion.controls['estado'].value === '' ||
      this.fgValidacion.controls['sede'].value === '' ||
      this.fgValidacion.controls['impuestos'].value === '' ||
      this.fgValidacion.controls['año_vehiculo'].value === ''  ||
      this.fgValidacion.controls['año_compra'].value === ''||
      this.fgValidacion.controls['numero_chazis'].value === '' ||
      this.fgValidacion.controls['numero_motor'].value === ''
    ){
      this.toastr.error('Todos los campos son obligatorios', 'ERROR')
      return
    } 

    const vehiculo: Vehiculo = new Vehiculo()

  vehiculo.placa =  this.fgValidacion.controls['placa'].value
  vehiculo.color =  this.fgValidacion.controls['color'].value
  vehiculo.marca =  this.fgValidacion.controls['marca'].value 
  vehiculo.modelo = this.fgValidacion.controls['modelo'].value
  vehiculo.estado = this.fgValidacion.controls['estado'].value
  vehiculo.sede = this.fgValidacion.controls['sede'].value
  vehiculo.impuestos =  this.fgValidacion.controls['impuestos'].value
  vehiculo.año_vehiculo =  this.fgValidacion.controls['año_vehiculo'].value
  vehiculo.año_compra =  this.fgValidacion.controls['año_compra'].value
  vehiculo.numero_chazis = this.fgValidacion.controls['numero_chazis'].value
  vehiculo.numero_motor =  this.fgValidacion.controls['numero_motor'].value

    this.vehiculoServices.crearVehiculo(vehiculo).subscribe({
      next: ()=>{window.location.reload()},
      error: (error: HttpErrorResponse)=>{this.toastr.error(`${error.error.msg}`,'ERROR')}
    })
  }

  

}
