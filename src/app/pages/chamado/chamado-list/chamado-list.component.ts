import { Usuario } from './../../usuario/shared/usuario.model';
import { AppComponent } from './../../../app.component';
import { Pessoa } from './../../pessoa/shared/pessoa.model';
import { UsuarioService } from './../../usuario/shared/usuario.service';
import { EquipService } from './../../equipamento/shared/equip.service';
import { StatusService } from './../../status/shared/status.service';
import { PessoaService } from './../../pessoa/shared/pessoa.service';
import { ChamadoService } from './../shared/chamado.service';
import { Chamado } from './../shared/chamado.model';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  chamadoList: Chamado[] = [];

  funcao: string;

  usuarioLog: Usuario;

  chamadoNovo: Chamado = new Chamado();

  filtro: string;


  constructor(
    private chamadoService: ChamadoService,
    private appC: AppComponent 
    ) { }

  ngOnInit() {
    this.usuarioLog = this.appC.usuarioLogado;
    this.funcao= this.appC.usuarioLogado.funcao;
    console.log("CHAMADOLIST: "+this.funcao);

    this.getAllPessoas();
  }

  verChamadoLog(){
    console.log(this.chamadoNovo);
    this.chamadoService.create(this.chamadoNovo).subscribe(dados => this.chamadoNovo = dados);
  }

  deleteChamado(id: string){
    if (confirm('deseja excluir?')){
      this.chamadoService.deleteChamado(id).subscribe(
        result => console.log(result),
        err => console.error(err)
        );
      this.getAllPessoas();
    }
  }

  private getAllPessoas(){
    this.chamadoService.getAll().subscribe(dados => this.chamadoList = dados);
  }

}
