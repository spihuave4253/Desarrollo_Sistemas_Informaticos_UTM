import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = [
    { label: 'Total Tickets', value: 0 },
    { label: 'Abiertos', value: 0 },
    { label: 'Resueltos', value: 0 }
  ];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (res) => {
        const tickets = res.data;
        this.stats[0].value = tickets.length;
        this.stats[1].value = tickets.filter((t: any) => t.estado === 'abierto').length;
        this.stats[2].value = tickets.filter((t: any) => t.estado === 'resuelto').length;
      }
    });
  }
}