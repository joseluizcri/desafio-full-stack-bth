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

  chamadoNovo: Chamado = new Chamado();


  constructor(
    private chamadoService: ChamadoService,
    private pessoaService: PessoaService,
    private statusService: StatusService,
    private equipService: EquipService,
    private userServide: UsuarioService 
    ) { }

  ngOnInit() {
    
    this.pessoaService.getById('5c5ce7db7a02d217883489ee').subscribe(cli => this.chamadoNovo.cliente = cli);
    this.statusService.getById('5c5f565a7a02d21c580e0939').subscribe(dados=> this.chamadoNovo.status = dados);
    this.equipService.getById('5c5f8c427a02d216c8aab748').subscribe(dados=> this.chamadoNovo.equipamento = dados);
    this.userServide.getById('5c5fa1637a02d21d1c985e98').subscribe(dados=>this.chamadoNovo.responsavel = dados);
    this.chamadoNovo.dataChamado = new Date();
    this.chamadoNovo.dataEncerramento = new Date();
    this.chamadoNovo.defeito = 'Não liga';
    this.chamadoNovo.solucao = 'Realizado reparo na placa fonte';
    //this.chamadoService.create(this.chamadoNovo).subscribe(dados => this.chamadoNovo = dados);
    console.log(this.chamadoNovo);
    this.getAllPessoas();
    console.log('Lista do GET: '+this.chamadoList);
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
