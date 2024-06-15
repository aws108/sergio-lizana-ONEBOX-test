import { Component, OnInit } from '@angular/core';
import { InterchangeDataService } from '../services/interchange-data.service';
import { EventsDataServiceService } from '../services/events-data-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  showCartInfo: any = [];
  storedTitle: any;

  constructor(private interchangeDataService: InterchangeDataService,
              private eventsDataService: EventsDataServiceService
  ){}
  
  ngOnInit(): void {
    const getCartInfo = this.eventsDataService.getCartInfo();
    if (getCartInfo.length > 0) {
      this.showCartInfo = getCartInfo;
      this.loadCartEvents();
    } else{
      this.loadCartEvents();
    }
  }

  loadCartEvents(): void {
    this.interchangeDataService.updateCartInfo$.subscribe(eventSelected => {
      if (eventSelected){
        this.updateCartInfo(eventSelected);
      }
    });
  }

  updateCartInfo(eventSelected: any): void {
    const eventDate = eventSelected.dateSelected;
    const eventTitle = eventSelected.completeInfoEvent.event.title;
    const eventId = eventSelected.completeInfoEvent.event.id;
    const quantitySelected = eventSelected.quantitySelected;

    const existingEventTitleAndDateIndex = this.showCartInfo.findIndex((event: any) => event.titleEvent === eventTitle && event.dateSelected === eventDate);

    const existingEventTitleDifferentDateIndex = this.showCartInfo.findIndex((event: any) => event.titleEvent === eventTitle && event.dateSelected !== eventDate);

    if (existingEventTitleAndDateIndex !== -1) {
      this.showCartInfo[existingEventTitleAndDateIndex].quantitySelected = quantitySelected;
      this.showCartInfo[existingEventTitleAndDateIndex].id = eventId;
    } else if (existingEventTitleDifferentDateIndex !== -1) {

      this.showCartInfo.push({
        dateSelected: eventDate,
        quantitySelected: quantitySelected,
        id: eventId
      });
    } else {
      this.showCartInfo.push({
        titleEvent: eventTitle,
        dateSelected: eventDate,
        quantitySelected: quantitySelected,
        id: eventId
      });
    }

    const uniqueEventsMap = new Map();
    this.showCartInfo.forEach((event: any) => {
      uniqueEventsMap.set(event.dateSelected, event);
    });
    this.showCartInfo = Array.from(uniqueEventsMap.values());

    this.interchangeDataService.saveCartInfo(this.showCartInfo);
  }

  deleteCartInfo(cartInfo: any): any {
    if (cartInfo.quantitySelected > 0) {
      this.showCartInfo.forEach((event: any) => {
        if (event.dateSelected === cartInfo.dateSelected && event.id === cartInfo.id) {
          if (event.quantitySelected !== undefined) {
            event.quantitySelected = event.quantitySelected - 1;
          }
        }
      })
    } else{
      if (cartInfo.quantitySelected <1){
        this.showCartInfo = this.showCartInfo.filter((event: any) => 
          !(event.dateSelected === cartInfo.dateSelected && event.id === cartInfo.id)
        );
      }
    }
  }
}