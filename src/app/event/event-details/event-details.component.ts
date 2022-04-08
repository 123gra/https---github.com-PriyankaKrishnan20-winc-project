import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from 'src/app/core/service/event-service/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  @Input()
  eventDetails: any;

  @Input()
  venueDetails: any;

  eventId: any;


  constructor(private router: Router, private eventService: EventService) {
    
  }

  ngOnInit(): void {
    
    console.log("Inside Event details");
    this.eventId = this.router.url.split('/')[2];
    this.eventService.getEventById(this.eventId).subscribe((res) => {
      this.eventDetails = res.eventDetails;
      this.eventService
        .getVenueById(this.eventDetails.venueId)
        .subscribe((res) => {
          this.venueDetails = res.venueDetails;
        });
    });
  }

  navigateToBooking() {
    this.router.navigate([`booking/${this.eventId}`]);
  }
}
