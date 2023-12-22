import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment'
import { Announce } from '../../models/announce';

@Injectable({
  providedIn: 'root'
})

export class AnnouncesService {
  
  baseUrlEventType = environment.baseUrl+"event-types/";
  baseUrlEvent = environment.baseUrl+"events/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  tableData = [
    { text: "Le Sahré Ivoire vous souhaite d'excellentes fêtes de fin d'année !", isActive: true },
    { text: '-50% de réduction sur votre prochaine commande', isActive: false }
  ];

  constructor( private http: HttpClient ) { }

  getAnnounces() : Observable<Announce[]>{
    return of(this.tableData)
  }


}
