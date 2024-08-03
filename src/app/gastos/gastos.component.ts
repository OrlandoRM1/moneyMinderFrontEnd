import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Gasto } from './Gasto';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGastoModalComponent } from '../add-gasto-modal/add-gasto-modal.component';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {
  gastos: Gasto[] = [];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.getGastos().subscribe(data => {
      this.gastos = data;
    });
  }

  openAddGastoModal(): void {
    const dialogRef = this.dialog.open(AddGastoModalComponent, {
      width: '400px',
      height: '550px' // Ajusta el tamaño del modal según necesites
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); // Refresh the list of gastos
      }
    });
  }

  editGasto(gasto: Gasto): void {
    // Lógica para editar el gasto
  }

  deleteGasto(idGastos: number): void {
    // Lógica para eliminar el gasto
  }
}
