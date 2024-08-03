import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.css'
})
export class LoguinComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Maneja la respuesta exitosa del servidor
        console.log('Login exitoso', response);
        localStorage.setItem('authToken', response.token);

        // Redirigir al usuario a la página de gastos
        this.router.navigate(['/gastos']);
      },
      error => {
        // Maneja los errores de autenticación
        console.error('Error de login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }

}
