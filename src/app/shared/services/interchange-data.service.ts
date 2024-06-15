import { Injectable } from "@angular/core";
import { BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InterchangeDataService {

    private updateCart = new BehaviorSubject<any>(null);
    updateCartInfo$ = this.updateCart.asObservable();

    private saveCart = new BehaviorSubject<any>(null);
    saveCartInfo$ = this.saveCart.asObservable();

    constructor() { }

    sendDataToCart(data: any) {
        this.updateCart.next(data);
    }

    saveCartInfo(cartInfoToSave: any): void {
        this.saveCart.next(cartInfoToSave);
    }


}