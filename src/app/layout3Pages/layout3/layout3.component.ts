import { ChangeDetectorRef, Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgbOffcanvas, OffcanvasDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-layout3",
  templateUrl: `layout3.component.html`,
  styles: [
    `
      /* .active0:hover .active1 {
        display: block;
      }
      .active1 {
        display: none;
      } */
    `,
  ],
})
export class Layout3Component implements OnInit {
  closeResult = "";
  selectedTab = "about";
  activeIndex: any;
  swiper: any;

  constructor(private offcanvasService: NgbOffcanvas, public router: Router, public service: AppService, private changeDetectorRef: ChangeDetectorRef) {}

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

  public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }
  changeSlide(index: any) {
    this.swiper.swiperRef.slideTo(index);
    this.changeDetectorRef.detectChanges();
  }
}
