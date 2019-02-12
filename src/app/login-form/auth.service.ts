import { Usuario } from './../pages/usuario/shared/usuario.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  faserLogin(usuario: Usuario){
    if (usuario.email === 'junior.joseluizrosa@gmail.com' &&
    usuario.senha==='123456'){
      console.log('entrou if: '+usuario);
      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = false;
    }
  }
}
