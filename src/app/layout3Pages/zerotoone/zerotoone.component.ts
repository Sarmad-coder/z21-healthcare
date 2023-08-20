import { animate, style, transition, trigger } from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterState } from "@angular/router";
import { auto } from "@popperjs/core";
import { AppService } from "src/app/app.service";
import Swiper, { Autoplay, SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";
declare let gtag: Function;
@Component({
  selector: "app-zerotoone",
  templateUrl: "./zerotoone.component.html",
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
export class ZerotooneComponent implements OnInit {
  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent | undefined;
  animation: any;
  activeIndex: any = 0;

  config: SwiperOptions = {
    slidesPerView: auto,
    direction: "vertical",
    spaceBetween: 0,
    speed: 800,
    navigation: true,

    mousewheel: {
      invert: false,
      releaseOnEdges: true,
      sensitivity: 0,
    },
    effect: "creative",
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private service: AppService, private changeDetectorRef: ChangeDetectorRef, public router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
    ){
      this.handleRouteEvents();
    }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.swiper?.swiperRef.slideNext();
    //   this.swiper?.swiperRef.slideNext();
    //   this.swiper?.swiperRef.slideNext();
    // }, 1000);
  }

  // onSwiper([swiper]: any) {
  //   // console.log(swiper, "swiper hun  ein");
  // }

  onSlideChange(e: [Swiper]) {
    const { activeIndex } = e[0];
    this.activeIndex = activeIndex;
    this.service.setActiveIndex(activeIndex);
  }

  changeSlide() {
    this.swiper?.swiperRef.slideNext(800);
    console.log(this.swiper);
  }
  public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }
  openNavbar() {
    this.service.openNavbar();
  }
  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
}
