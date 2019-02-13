import { Status } from './../../status/shared/status.model';
import { Usuario } from './../../usuario/shared/usuario.model';
import { AppComponent } from './../../../app.component';
import { Chamado } from './../shared/chamado.model';
import { ChamadoService } from './../shared/chamado.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../pessoa/shared/pessoa.model';
import { Equip } from '../../equipamento/shared/equip.model';

@Component({
  selector: 'app-chamado-detail',
  templateUrl: './chamado-detail.component.html',
  styleUrls: ['./chamado-detail.component.css']
})
export class ChamadoDetailComponent implements OnInit {

  selectedId: string;
  chamado: Chamado = new Chamado();
  chamadoBanco: Chamado = new Chamado();

  usuarioLog: Usuario;

  constructor(
    private route: ActivatedRoute,
    private chamadoService: ChamadoService,
    private appC: AppComponent
  ) { }

  ngOnInit() {
    this.chamado.cliente=new Pessoa();
    this.chamado.equipamento = new Equip();
    this.chamado.responsavel = new Usuario();
    this.chamado.status = new Status();

    this.route.paramMap.subscribe(
      params => {
        this.selectedId = params.get('id') || "novo";
      }
    )

    this.usuarioLog = this.appC.usuarioLogado;

    this.chamadoService.getById(this.selectedId).subscribe(dados => this.chamado = dados);
  }

  atualizarChamado(){
    this.chamadoService.create(this.chamado).subscribe(dados => this.chamado = dados);
    //implementar navigate
  }

}
