import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Chamado } from './chamado.model';
import {map, catchError, flatMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private apiPath: string = "/api/chamado"

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any[]>(this.apiPath);
  }
  
  
  create(chamado: Chamado): Observable<Chamado>{
    return this.http.post(this.apiPath, chamado).pipe(
      catchError(this.handleError),
      map(this.jsonDataOneStatus)
    )
  }
  
  getById(id:String): Observable<Chamado>{
    return this.http.get(this.apiPath+'/'+id)
    .pipe(
      map(this.jsonDataOneStatus),
      map(this.jsonDataOneStatus)
    );
  }

  
  
  deleteChamado(id:String): Observable<any>{
      return this.http.delete(this.apiPath+'/'+id);
  }
  
  //private methods
    
  private jsonDataOneStatus(jsonData:any): Chamado{
    return jsonData as Chamado;
  }
  
  private handleError(error:any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO -> ", error);
    return throwError(error);
  
  }
}
