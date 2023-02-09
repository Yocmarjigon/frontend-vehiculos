import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { InfoService } from 'src/app/services/info.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  id_usuarios = '';
  cedula = '';
  email = '';
  nombre_apellido = '';
  licencia = '';
  categoria = '';
  pdf_licencia = '';
  licencia_exp = '';
  licencia_venc = '';
  password = '';
  
  enlace = ''
  id:string = ''
  @Input() idConductor:string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private conductorServices: ConductorService,
    private activarServices: ActivarPanelService,
    private infoServices: InfoService
    ){
  }

  ngOnInit(): void {
    this.cargarConductor()
    console.log(this.idConductor)
  }

  cargarConductor ()  {
    this.conductorServices.mostrarConductor(this.idConductor).subscribe(valor =>{
      this.cedula = valor.cedula!
      this.email = valor.email!
      this.nombre_apellido = valor.nombre_apellido!
      this.licencia = valor.licencia!
      this.categoria = valor.categoria!;
      this.licencia_exp = valor.licencia_exp?.toString()!
      this.licencia_venc = valor.licencia_venc?.toString()!
      this.password = valor.password!
      this.enlace = valor.pdf_licencia!
    })
  }

  cerrarPanel() {
    this.activarServices.$activarPanelDetalles.emit(false);
  }
}
