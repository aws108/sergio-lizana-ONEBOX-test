import { Component, OnInit } from '@angular/core';
import { EventsDataServiceService } from 'src/app/shared/services/events-data-service.service';
import { Events } from 'src/app/shared/interfaces/type-data.interface';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit{

  events: any[] = [];

  constructor(private datePipe: DatePipe,
              private eventsService: EventsDataServiceService,
  ){}


  ngOnInit() {
    this.eventsService.getEvents().subscribe(allEvents => {
      this.formatData(allEvents);
    });
  }

  formatData(allEvents: Events[]){
    allEvents.forEach(eventType => {
      const formattedStartDate = this.datePipe.transform(new Date(Number(eventType.startDate)), 'yyyy/MM/dd');
      const formattedEndDate = this.datePipe.transform(new Date(Number(eventType.endDate)), 'yyyy/MM/dd');
      const objectData = {
        description: eventType.description,
        endDate: formattedEndDate,
        id: eventType.id,
        image: eventType.image,
        place: eventType.place,
        startDate: formattedStartDate,
        subtitle: eventType.subtitle,
        title: eventType.title,
      }
      this.events.push(objectData);
    });
    this.events.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    this.events.forEach(eventOrdered => {
      eventOrdered.startDate = this.datePipe.transform(new Date(eventOrdered.startDate), 'dd/MM/yyyy');
      eventOrdered.endDate = this.datePipe.transform(new Date(eventOrdered.endDate), 'dd/MM/yyyy');
    });
  }


}