import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/app/models/Gerente';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { GerenteService } from 'src/app/services/gerente.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  searchText:any
  gerentes:Gerente[] = []
  p: number = 1;
  activarCrear = false


  constructor(
    private gerenteServices: GerenteService,
    private activarServices: ActivarPanelService
    ){

  }

  ngOnInit(): void {
    this.mostrandoGerentes()
    this.activarServices.$panelNav.emit(true)
    this.activarServices.$activarPanelCrear.subscribe(
      (valor) => {this.activarCrear = valor }
    )

  }

  mostrandoGerentes(){
    this.gerenteServices.mostrarGerente().subscribe(valor => this.gerentes = valor)
  }
  abrirCrear(){
    this.activarCrear = true;
  }

  abrirDetalles(id: string){
  }
  abrirEditar(id: string){
  }
  eliminandoGerente(id: string){
  }

}
