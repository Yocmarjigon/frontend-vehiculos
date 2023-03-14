import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Gerente } from 'src/app/models/Gerente';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { GerenteService } from 'src/app/services/gerente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  searchText: any;
  gerentes: Gerente[] = [];
  p: number = 1;
  activarCrear = false;

  constructor(
    private gerenteServices: GerenteService,
    private activarServices: ActivarPanelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mostrandoGerentes();
    this.activarServices.$panelNav.emit(true);
    this.activarServices.$activarPanelCrear.subscribe((valor) => {
      this.activarCrear = valor;
    });
  }

  mostrandoGerentes() {
    this.gerenteServices
      .mostrarGerente()
      .subscribe((valor) => (this.gerentes = valor));
  }

  abrirCrear() {
    this.activarCrear = true;
  }

  abrirDetalles(id: string) {}
  abrirEditar(id: string) {}
  eliminandoGerente(id: string) {
    Swal.fire({
      title: 'Deseas eliminar este gerente?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.gerenteServices.eliminandoGerente(id).subscribe({
          next: () => {
            this.toastr.success('Gerente eliminado correctamente', 'OK');
            this.ngOnInit();
          },
          error: (error: HttpErrorResponse) => {
            `${error.error.msg}`;
          },
        });
      }
    });
  }
}
