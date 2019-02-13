import { ID_STATUS_ABERTO, ID_STATUS_FINALIZADO } from './../../../variaveis.globais';
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

import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  chamadoList: Chamado[] = [];
  
  statusId: string = ID_STATUS_FINALIZADO;
  statusIdAberto: string = ID_STATUS_ABERTO;

  funcao: string;

  usuarioLog: Usuario;

  chamadoNovo: Chamado = new Chamado();

  filtro: string;


  constructor(
    private chamadoService: ChamadoService,
    private statusService: StatusService,
    private appC: AppComponent,
    private router: Router
    ) { }

  ngOnInit() {
    this.usuarioLog = this.appC.usuarioLogado;
    this.funcao= this.appC.usuarioLogado.funcao;

    this.getAllPessoas();
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

  finalizarChamado(chamado: Chamado){
    this.statusService.getById(ID_STATUS_FINALIZADO).subscribe(
      dados => chamado.status = dados || chamado.status,
      ()=>{},
      ()=>{
        this.chamadoService.create(chamado).subscribe(
          result => console.log(result),
          err => console.error(err),
          ()=>{this.router.navigate(['/chamados'])}
        )
      }
      );
  }

  aceitarChamado(chamado: Chamado){
    if (confirm('Deseja atender este chamado?')) {
      chamado.responsavel = this.usuarioLog;
      this.chamadoService.create(chamado).subscribe(
        result => console.log(result),
        err => console.error(err),
        () => { this.router.navigate(['/chamados']) }
      )
    }
    
  }

  private getAllPessoas(){
    this.chamadoService.getAll().subscribe(dados => this.chamadoList = dados);
  }

}
