import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from '../core/service/booking-service/booking-service.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent implements OnInit {
  bookingDetails: any;
  constructor(
    private bookingService: BookingServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let bookingId = this.router.url.split('/')[2];
    this.bookingService.getBookingById(bookingId).subscribe((res: any) => {
      this.bookingDetails = res.bookingDetails;
    });
  }
}
