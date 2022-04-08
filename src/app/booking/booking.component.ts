import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from '../core/service/booking-service/booking-service.service';
import { EventService } from '../core/service/event-service/event.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  eventList: any;

  @Input()
  eventDetails: any = {};

  @Input()
  slotDetail: any;

  @Input()
  totalCost: number = 0;

  eventId: any;
  selectedSlotType: any;
  numberOfSeats: any;
  venueDetails: any;

  constructor(
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingServiceService
  ) {}

  ngOnInit(): void {
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

  bookTicketsInSlot(slotId: string) {
    this.eventDetails.slotDetails.forEach((slot: any) => {
      if (slot._id === slotId) {
        this.slotDetail = slot;
      }
    });
  }

  slotSelected() {
    return !!this.slotDetail;
  }

  onSlotTypeChange(event: any) {
    this.selectedSlotType = event.target.id;
  }

  isSlotTypeSelected() {
    return !!this.selectedSlotType;
  }

  selectedNumberOfSeats(event: any) {
    this.numberOfSeats = event.target.value;
    if (this.selectedSlotType === 'vip') {
      this.totalCost = event.target.value * this.eventDetails.vipPrice;
    } else {
      this.totalCost = event.target.value * this.eventDetails.gaPrice;
    }
  }

  isNumberOfSeatsEntered() {
    return !!this.numberOfSeats;
  }

  confirmBooking() {
    let bookingInfo = {
      eventId: this.eventId,
      slotId: this.slotDetail._id,
      noOfGaSeats: this.selectedSlotType === 'ga' ? this.numberOfSeats : 0,
      noOfVipSeats: this.selectedSlotType === 'vip' ? this.numberOfSeats : 0,
      bookingStatus: 'pending',
      bookingDate: new Date(),
      venueId: this.venueDetails._id,
      userId: '6228d07b750b45cdffd10eb6',
    };
    this.bookingService.bookSlot(bookingInfo).subscribe({
      next: (res: any) => {
        this.router.navigate([`booking-confirmed/${res.bookingDetails._id}`]);
      },
    });
  }
}
