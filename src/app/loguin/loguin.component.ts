import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoginResponse } from './LoginResponse';

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
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  onSubmit(): void {
    this.isLoading = true;
    if (!this.username || !this.password) {
      this.isLoading = false;
      this.showDialog('FAILED', 'Usuario y contraseña son requeridos.');
      return;
    }

      this.authService.loginAnt(this.username, this.password).subscribe(
        (response: LoginResponse) => {
          this.isLoading = false;
          if (response.exist) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/gastos']); 
          } else {
            this.isLoading = false;
            this.router.navigate(['/']);
          }
        },
        (error: any) => { 
          this.showDialog('FAILED', 'Usuario o contraseña inválidos.');
          this.isLoading = false;
          ;
        }
      );
    
  }

  showDialog(title: string, content: string, details?: string[]): void {
    this.dialog.open(MessageDialogComponent, {
      width: '300px',
      data: { messageTitle: title, messageContent: content, details: details }
    });
  }

}
