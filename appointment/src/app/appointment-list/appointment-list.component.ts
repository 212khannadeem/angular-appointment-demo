import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointmentDesc: string = '';
  appointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppointment = localStorage.getItem('appointment');

    this.appointments = savedAppointment ? JSON.parse(savedAppointment) : [];
  }

  addAppointment() {
    if (this.appointmentDesc.length && this.appointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.appointmentDesc,
        date: this.appointmentDate,
      };
      this.appointments.push(newAppointment);
      localStorage.setItem('appointment', JSON.stringify(this.appointments));
      this.appointmentDesc = '';
      this.appointmentDate = new Date();
    }
  }

  deleteAppointment(index: number) {
    this.appointments.slice(index, 1);
    localStorage.setItem('appointment', JSON.stringify(this.appointments));
  }
}
