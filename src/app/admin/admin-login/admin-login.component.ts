import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/shared/event.service';
import {Event} from 'src/app/shared/event.model';

@Component({

  selector:'app-admin-add-events',
  templateUrl:'./admin-login.component.html',
  styleUrls:['./admin-login.component.css'],
  providers: [EventService]
})
export class AdminLoginComponent implements OnInit {


  constructor(public eventService:EventService ) {}

  ngOnInit(): void {
    this.resetForm();
    this.refreshEventList();

  }



  resetForm(form?: NgForm){
    if(form)
    form.reset();

    this.eventService.selectedEvent={
      _id:"",
      description:"",
      name:"",
      eventDate:new Date(),
      city:"",
      category:"",
      vipPrice:0,
      gaPrice:0

    }
  };

  onSubmitTemplateBased(form: NgForm){
  if(form.value._id==""){
    this.eventService.postEvent(form.value).subscribe((res) =>{
      this.resetForm(form);
      this.refreshEventList();
      alert('submitted successfully');
    });
  }

    else{
      this.eventService.putEvent(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEventList();
        alert('updated successfully');
       });
      }
    };

    refreshEventList(){
       this.eventService.getEventList().subscribe((res)=>{
        this.eventService.events=res as Event[];
       });
    };

    onEdit(evt:Event){

      this.eventService.selectedEvent=evt;

    };

    onDelete(_id:String,form: NgForm){

      if(confirm('Are you sure you want to delete this event?')==true){
        this.eventService.deleteEvent(_id,).subscribe((res)=>{
          this.refreshEventList();
          this.resetForm(form);
          alert('deleted successfully');
        });
      }

    }



}


