import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticket: Ticket = {
    titulo: '',
    descripcion: '',
    categoria: 'software',
    prioridad: 'media',
    estado: 'abierto'
  };
  isEdit = false;
  ticketId: string | null = null;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId) {
      this.isEdit = true;
      this.ticketService.getTicket(this.ticketId).subscribe({
        next: (res) => {
          this.ticket = res.data;
        },
        error: (err) => console.error('Error al cargar ticket:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.ticketId) {
      this.ticketService.updateTicket(this.ticketId, this.ticket).subscribe({
        next: () => {
          alert('Ticket actualizado correctamente');
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el ticket');
        }
      });
    } else {
      this.ticketService.createTicket(this.ticket).subscribe({
        next: () => {
          alert('Ticket creado correctamente');
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el ticket');
        }
      });
    }
  }
}