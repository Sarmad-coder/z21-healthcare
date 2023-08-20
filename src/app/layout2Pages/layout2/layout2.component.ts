import { animate, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgbOffcanvas, OffcanvasDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-layout2",
  templateUrl: `layout2.component.html`,
  styles: [],
  animations: [
    trigger("fadeAnimation", [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translateY(-100%)",
        }),
        animate(400),
      ]),
      // transition(":leave", [
      //   style({
      //     opacity: 0,
      //     transform: "translateY(0%)",
      //   }),
      //   animate(0),
      // ]),
    ]),
  ],
})
export class Layout2Component implements OnInit {
  closeResult = "";
  selectedTab = "oxynow";
  activeIndex: any;
  swiper: any;
  constructor(private router: Router, public service: AppService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.data$.subscribe((res) => {
      this.activeIndex = res;
      this.changeDetectorRef.detectChanges();
    });
    this.service.customSlide$.subscribe((res) => {
      this.swiper = res;
      console.log("kkkk");
      console.log(res);
    });
  }

  openNavbar() {
    this.service.openNavbar();
  }

  changeSlide(index: any) {
    this.swiper.swiperRef.slideTo(index);
    this.changeDetectorRef.detectChanges();
  }
  public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }
}
