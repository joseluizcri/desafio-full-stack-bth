import { HistoricoChamado } from './../shared/historico-chamado.model';
import { Status } from './../../status/shared/status.model';
import { Usuario } from './../../usuario/shared/usuario.model';
import { AppComponent } from './../../../app.component';
import { Chamado } from './../shared/chamado.model';
import { ChamadoService } from './../shared/chamado.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  historicoList: HistoricoChamado[] = [];

  historico: HistoricoChamado = new HistoricoChamado();

  usuarioLog: Usuario;

  constructor(
    private route: ActivatedRoute,
    private chamadoService: ChamadoService,
    private appC: AppComponent,
    private router: Router
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
    this.getAllHistorico(this.selectedId);
  }

  atualizarChamado(){

    this.chamadoService.create(this.chamado).subscribe(
      dados => this.chamado = dados,
      ()=>{},
      ()=>{
        
        this.historico.chamado = this.chamado;
        console.log(this.historico);
        this.chamadoService.gravarHistorico(this.historico).subscribe(
          dados => this.historico = dados,
          err=>console.log('Erro >>>>>>>>>>>>>>>>>>> '+err),
          ()=>{this.router.navigate(['/chamados'])}
        );
        
      }
      );

    //implementar navigate
  }

  private getAllHistorico(id: string){
    this.chamadoService.getHistorico(id).subscribe(dados => this.historicoList = dados);
  }

}
