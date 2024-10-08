import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class OptionsService {
  
  baseUrlOptions = environment.baseUrl+"options/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor( private http: HttpClient ) { }

  getOptions(queryOption : string) : Observable<any>{
    return this.http.get<any>(this.baseUrlOptions+`?${queryOption}`)
  }

  getOptionById( optionId : number) : Observable<any>{
    return this.http.get<any>(this.baseUrlOptions+`${optionId}`)
  }

  createOption( data : any) : Observable<any>{
    return this.http.post<any>(this.baseUrlOptions, data)
  }

  editOption( optionId : number, data : any ) : Observable<any>{
    return this.http.put<any>(this.baseUrlOptions+`${optionId}`, data)
  }

  deleteOption( optionId : number) : Observable<any>{
    return this.http.delete<any>(this.baseUrlOptions+`${optionId}`)
  }

}
