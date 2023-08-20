import { AfterViewInit, Component, Inject, Renderer2, TemplateRef, ViewChild } from "@angular/core";
import { EffectCreative, Mousewheel, SwiperOptions } from "swiper";
import SwiperCore from "swiper";
import { auto } from "@popperjs/core";
import { SwiperComponent } from "swiper/angular";
import { NgbOffcanvas, OffcanvasDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "./app.service";
import { Router,NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from "@angular/common";


// import * as anime from "animejs";
const anime = require("animejs");

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent implements AfterViewInit {
  private resizeListener!: () => void;
  animation: any;
  constructor(
    private offcanvasService: NgbOffcanvas, 
    public service: AppService, 
    public router: Router,
    private renderer: Renderer2, 
    public titleService:Title,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
    ) {
    SwiperCore.use([EffectCreative, Mousewheel]); // Add Swiper modules

    console.log("31/01/2023");



    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      let title = 'Default Title';
      if (event['title']) {
        title = event['title'];
      }
      this.titleService.setTitle(title);
    });
  }

  imgSrc = "";
  imgSrc2 = "";
  imgSrc3 = "";
  imgSrc4 = "";
  imgSrc5 = "";
  imgSrc6 = "";

  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent | undefined;
  @ViewChild("offCanvas", { static: false, read: TemplateRef }) offCanvas?: TemplateRef<any> | undefined;

  config: SwiperOptions = {
    slidesPerView: auto,
    direction: "horizontal",
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

  ngAfterViewInit(): void {}

  ngOnInit(){
    this.service.openNav$.subscribe((res) => {
      this.openCustomPanelClass();
    });

    console.log(this.router.url);


    // this.resizeListener = this.renderer.listen('window', 'resize', (e) => {
    //   this.checkOrientation();
    // });
  }

  // checkOrientation() {
  //   if (window.innerHeight > window.innerWidth) {
  //     this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
  //   } else {
  //     this.renderer.setStyle(this.document.body, 'overflow', 'scroll');
  //   }
  // }


  title = "z21-healthcare";

  openCustomPanelClass() {
    this.offcanvasService.open(this.offCanvas, { panelClass: "customCanvas" });
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return "by clicking on the backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }
}
