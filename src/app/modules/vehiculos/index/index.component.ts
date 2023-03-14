import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Vehiculo } from 'src/app/models/Vehiculo';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  searchText: any;
  p = 1;
  activarCrear: boolean = false;

  constructor(
    private activarPanel: ActivarPanelService,
    private vehiculoServices: VehiculoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activarPanel.$panelNav.emit(true);
    this.cargarVehiculo();
    this.activarPanel.$activarPanelCrear.subscribe(
      (valor) => (this.activarCrear = valor)
    );
  }

  cargarVehiculo() {
    this.vehiculoServices.mostrarVehiculos().subscribe((valor) => {
      this.vehiculos = valor;
      console.log(valor);
    });
  }

  abrirCrear() {
    this.activarCrear = true;
  }

  eliminandoVehiculo(id: string) {

    Swal.fire({
      title: 'Deseas eliminar este vehículo?',
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
        this.vehiculoServices.elimnarVehiculo(id).subscribe({
          next: () => {
            this.toastr.success('Vehìculo eliminado correctamente', 'OK');
            this.ngOnInit()
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(`${error.error}`);
          },
        });
      }
    });
  }
}
