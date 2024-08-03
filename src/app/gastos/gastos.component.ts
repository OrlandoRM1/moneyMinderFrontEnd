import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Gasto } from './Gasto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {
  gastos: Gasto[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getGastos().subscribe(data => {
      this.gastos = data;
    });
  }

  editGasto(gasto: Gasto): void {
    // Lógica para editar el gasto
   /* console.log('Editar gasto:', gasto);
    this.gastoService.getGasto(gasto.idGastos).subscribe(data => {
      this.gastos = [data]; // Asegúrate de que es un solo objeto, no una lista
    });*/
  }

  deleteGasto(idGastos: number): void {
    // Lógica para eliminar el gasto
    /*console.log('Eliminar gasto con ID:', idGastos);
    this.gastoService.deleteGasto(idGastos).subscribe(() => {
      // Actualizar la lista de gastos después de eliminar
      this.gastos = this.gastos.filter(g => g.idGastos !== idGastos);
    });*/
  }

}
