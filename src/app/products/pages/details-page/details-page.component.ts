import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Sessions } from 'src/app/shared/interfaces/sessions-info.interface';
import { EventsDataServiceService } from 'src/app/shared/services/events-data-service.service';
import { InterchangeDataService } from 'src/app/shared/services/interchange-data.service';

@Component({
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy{
  sessionsInfo: any[] = [];
  eventId: any;
  eventDetails: any[] = [];
  errorMessage: string ='';
  inputNumber: any;
  detailsInfo: any;
  quantityChange: Subject<{index: number, quantity: number}> = new Subject();
  routeparamsSubs: Subscription = new Subscription;
  getEventsSubs: Subscription = new Subscription;

  constructor(private route: ActivatedRoute,
              private interchangeDataService: InterchangeDataService,
              private dataService: EventsDataServiceService,
              private datePipe: DatePipe){

              }

  ngOnInit(): void {
    this.setupQuantityChangeSubscription();

    this.routeparamsSubs = this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      if (this.eventId) {
        this.getEventsSubs = this.dataService.getEventsById(this.eventId).subscribe({
          next: (response) => {
            if (response){
              this.loadDetails(response);
            }
          },
          error: error => {
            this.errorMessage = "EVENT INFO NOT FOUND";
          }
        });
      }
    });
  }

  loadDetails(detailsInfo:any): void {
    this.detailsInfo = detailsInfo;
    this.loadSessions(detailsInfo.sessions);
  }

  loadSessions(detailSessionsInfo: any): void {
    const sortedSessions = detailSessionsInfo.sort((a: Sessions, b: Sessions) => {
      return Number(a.date) - Number(b.date);
    });

    sortedSessions.forEach((session: Sessions) => {
      const formattedEventDate = this.datePipe.transform(new Date(Number(session.date)), 'dd/MM/yyyy');

      const sessionsData = {
        date: formattedEventDate,
        availability: session.availability,
        quantity: 0
      }
      this.sessionsInfo.push(sessionsData);
    });
    // console.log('this.sessionsInfo', this.sessionsInfo)
  }

  increase(index: number): void {
    if (this.sessionsInfo[index].quantity < this.sessionsInfo[index].availability) {
      this.sessionsInfo[index].quantity++;
      this.quantityChange.next({index, quantity: this.sessionsInfo[index].quantity});
    }
  }

  decrease(index: number): void {
    if (this.sessionsInfo[index].quantity > 0) {
      this.sessionsInfo[index].quantity--;
      this.quantityChange.next({index, quantity: this.sessionsInfo[index].quantity});
    }
  }

  setupQuantityChangeSubscription(): void {
    this.quantityChange.pipe(
      debounceTime(300)).subscribe(change => {
        this.sessionsInfo[change.index].quantity = change.quantity;
        if (this.detailsInfo) {
          const allInfoToCart = {
            completeInfoEvent: this.detailsInfo,
            dateSelected: this.sessionsInfo[change.index].date,
            quantitySelected: this.sessionsInfo[change.index].quantity
          }
          this.interchangeDataService.sendDataToCart(allInfoToCart);
        }
      });
  }

  finishShopping(): void {
    this.interchangeDataService.saveCartInfo$.subscribe(savedCartInfo => {
      if (savedCartInfo) {
        this.dataService.saveCartInfo(savedCartInfo);
      }
      
    })
  }

  ngOnDestroy(): void {
    this.routeparamsSubs?.unsubscribe();
    this.getEventsSubs?.unsubscribe();
  }


}




