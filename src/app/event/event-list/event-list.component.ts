import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/service/event-service/event.service';
declare global {
  interface Window {
    filterEvent: any;
  }
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  eventList: any;
  eventListWithoutFilter: any;

  constructor(private eventService: EventService, router:Router) {
    
  }
  filterEventsList(value: string) {
    if (!!!value) {
      this.eventList = this.eventListWithoutFilter;
    } else {
      this.eventList = this.eventListWithoutFilter.filter((event: any) =>
        event.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  filterEventsListByCity(value: string) {
    if (value) {
      this.eventList = this.eventListWithoutFilter.filter((event: any) =>
        event.city.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((res) => {
      this.eventList = res.eventDetails;
      console.log(this.eventList);
      this.eventListWithoutFilter = res.eventDetails;
    });
    window.addEventListener('filterEvents', (e: any) =>
      this.filterEventsList(e.detail)
    );
    window.addEventListener('filterEventsByCity', (e: any) =>
      this.filterEventsListByCity(e.detail)
    );
  }
}
