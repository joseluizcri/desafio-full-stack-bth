import { Usuario } from './../pages/usuario/shared/usuario.model';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  logar(){
    this.usuario.email = 'junior.joseluizrosa@gmail.com';
    this.usuario.senha = '123456';
    console.log(this.usuario);
    this.authService.faserLogin(this.usuario);
  }
}
