import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private data = new BehaviorSubject<number>(0);
  private openNav: Subject<any> = new Subject();
  private customSlide: Subject<any> = new Subject();
  // private customSlide: Subject<any> = new Subject();

  constructor() {}

  get data$(): Observable<number> {
    return this.data.asObservable();
  }

  setActiveIndex(index: number) {
    this.data.next(index);
  }

  get openNav$(): Observable<any> {
    return this.openNav.asObservable();
  }
  openNavbar() {
    this.openNav.next(null);
  }

  setCustomSlide(ref: any) {
    this.customSlide.next(ref);
  }
  destroy() {
    this.customSlide.next(null);
  }
  

  get customSlide$(): Observable<any> {
    return this.customSlide.asObservable();
  }
}
