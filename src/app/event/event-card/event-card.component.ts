import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit{
  @Input()
  evt: any;
  eventDate!:Date;
  months:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  year!:Number;
  date!:Number;
  month!:string;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.eventDate = new Date(this.evt.eventDate);
    this.year = this.eventDate.getFullYear();
    this.date = this.eventDate.getDate();
    this.month = this.months[this.eventDate.getMonth()];
   
  }

  eventDetails() {
    this.router.navigate([`event/${this.evt._id}`]);
  }
}
