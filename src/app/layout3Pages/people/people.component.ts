import { animate, style, transition, trigger } from "@angular/animations";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { auto } from "@popperjs/core";
import { AppService } from "src/app/app.service";
import Swiper, { SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styles: [``],
  animations: [
    trigger("fadeAnimation", [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translateY(-100%)",
        }),
        animate(400),
      ]),
    ]),
  ],
})
export class PeopleComponent implements OnInit {
  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent | undefined;

  animation: any;
  activeIndex: number = 0;

  config: SwiperOptions = {
    slidesPerView: auto,
    direction: "vertical",
    spaceBetween: 0,
    speed: 800,
    navigation: true,
    mousewheel: {
      invert: false,
      // thresholdDelta: 200,
      // thresholdTime: 2000,
      releaseOnEdges: true,
      sensitivity: 0,
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: false,
        translate: [0, 0, -400],
      },
      next: {
        translate: [0, "100%", 0],
      },
    },
    on: {
      resize: function () {},
    },
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private service: AppService, public router: Router, private zone: NgZone) {}

  ngOnInit(): void {
    setTimeout(() => this.service.setCustomSlide(this.swiper), 2000);
  }

  onSlideChange([e]: [Swiper]) {
    const { activeIndex } = e;
    this.activeIndex = activeIndex;
    console.log(activeIndex, "active index");
    this.service.setActiveIndex(activeIndex);
  }

  changeSlide(index: any) {
    this.swiper?.swiperRef.slideTo(index);
  }

  isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }

  openNavbar() {
    this.service.openNavbar();
  }

  moveToHome() {
    this.zone.run(() => {
      this.router.navigate(["/home"]);
    });
  }
}
