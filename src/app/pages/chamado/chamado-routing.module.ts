import { ChamadoFormComponent } from './chamado-form/chamado-form.component';
import { ChamadoListComponent } from './chamado-list/chamado-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ChamadoListComponent},
  {path: 'new', component: ChamadoFormComponent},
  {path: ':id/edit', component: ChamadoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadoRoutingModule { }
