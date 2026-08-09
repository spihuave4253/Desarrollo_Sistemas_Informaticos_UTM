import { Component, OnInit } from '@angular/core';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (res) => {
        this.tickets = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar tickets:', err);
        this.loading = false;
      }
    });
  }

  deleteTicket(id: string): void {
    if (confirm('¿Estás seguro de eliminar este ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.loadTickets();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  getEstadoClass(estado: string): string {
    const clases: Record<string, string> = {
      'abierto': 'badge-warning',
      'en progreso': 'badge-info',
      'resuelto': 'badge-success',
      'cerrado': 'badge-secondary'
    };
    return clases[estado] || 'badge-secondary';
  }

  getPrioridadClass(prioridad: string): string {
    const clases: Record<string, string> = {
      'alta': 'badge-danger',
      'media': 'badge-warning',
      'baja': 'badge-primary'
    };
    return clases[prioridad] || 'badge-secondary';
  }
}