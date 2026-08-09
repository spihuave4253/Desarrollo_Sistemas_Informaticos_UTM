import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Ticket {
  _id?: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estado: string;
  fechaCreacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets`);
  }

  getTicket(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets/${id}`);
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(`${this.apiUrl}/tickets`, ticket);
  }

  updateTicket(id: string, ticket: Partial<Ticket>): Observable<any> {
    return this.http.put(`${this.apiUrl}/tickets/${id}`, ticket);
  }

  deleteTicket(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tickets/${id}`);
  }
}