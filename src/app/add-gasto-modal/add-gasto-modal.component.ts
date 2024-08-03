import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Gasto } from '../gastos/Gasto';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-gasto-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule // Verifica que esté incluido aquí también
  ],
  templateUrl: './add-gasto-modal.component.html',
  styleUrls: ['./add-gasto-modal.component.css']
})
export class AddGastoModalComponent {
  gastoForm: FormGroup;
  categorias: string[] = ['Internet', 'Servicios', 'Comida', 'Transporte'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddGastoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gastoForm = this.fb.group({
      fechaRegistro: [new Date(), Validators.required],
      monto: [0, Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  onSubmit2(): void {
    if (this.gastoForm.valid) {
      const nuevoGasto = this.gastoForm.value;
      this.dialogRef.close(nuevoGasto);
    }
  }

  onSubmit(): void {
    if (this.gastoForm.valid) {
      const nuevoGasto: Gasto = this.gastoForm.value;
      this.authService.createGasto(nuevoGasto).subscribe(
        (response) => {
          this.dialogRef.close(response); // Close dialog with response
        },
        (error) => {
          console.error('Error al crear gasto:', error);
          // Handle error here, e.g., show a notification
        }
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  formatCurrency(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value.replace(/,/g, ''));
    if (!isNaN(value)) {
      input.value = value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    }
  }
}
