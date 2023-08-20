import { Component, OnInit, ViewChild, Inject, AfterViewInit, Renderer2, OnDestroy } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { SwiperOptions } from "swiper";
import { Swiper } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { SharedService } from "src/app/shared.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterState } from "@angular/router";
declare let gtag: Function;
@Component({
  selector: "app-home",
  templateUrl: `home.component.html`,
  styles: [],
})
export class HomeComponent implements OnInit,OnDestroy {
  private resizeListener!: () => void;
  animation: any;
  sliderIndex: any

  @ViewChild("swiper", { static: false }) swiper!: SwiperComponent;

  config: SwiperOptions = {
    direction: "horizontal",
    spaceBetween: 0,
    speed: 800,
    loop: false,
    navigation: true,
    mousewheel: {
      invert: true,
      releaseOnEdges: true,
      sensitivity: 0,
    },
    effect: "creative",
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  title = '';
  title2 = '';
  title3 = '';
  i1 = 0;
  i2 = 0;
  i3 = 0
  typeWriterTimeout: any
  constructor(private sharedService: SharedService,
    private router: Router,
    private renderer: Renderer2, 
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.handleRouteEvents();
  }
 
  // ngAfterViewInit() {
  //   let scrollTimeout: any;
  //   window.addEventListener('wheel', (e) => {
  //     clearTimeout(scrollTimeout);

  //     scrollTimeout = setTimeout(() => {
  //       const direction = e.deltaY > 0 ? 'next' : 'prev';
  //       if (direction === 'next') {
  //         this.swiper.swiperRef.slideNext(800);
  //       } else {
  //         this.swiper.swiperRef.slidePrev(800);
  //       }
  //     }, 100);  // adjust this value to fine-tune the debounce time
  //   });

  // }

  ngOnInit() {

    this.typeWriter2('Driven by AI', 100);


    this.resizeListener = this.renderer.listen('window', 'resize', (e) => {
      // this.checkOrientation();
    });
  
  }

  // checkOrientation() {
  //   let img1=this.document.getElementById("img1")
  //   let img2=this.document.getElementById("img2")
  //   let top:any=-35;
  //   let img3=this.document.getElementById("img3")
  //   if (window.innerHeight < window.innerWidth) {
      
  //     if (img1) {
  //       this.renderer.setStyle(img1, 'top',top+'%',);
  //     }
  //     if (img2) {
  //       this.renderer.setStyle(img2, 'top',top+'%');
  //     }
  //     if (img3) {
  //       this.renderer.setStyle(img3, 'top',top+'%');
  //     }
      
  //   } else {
  //     // if (img1) {
  //     //   this.renderer.setStyle(img1, 'top','unset');
  //     // }
  //     // if (img2) {
  //     //   this.renderer.setStyle(img2, 'top','unset');
  //     // }
  //     // if (img3) {
  //     //   this.renderer.setStyle(img3, 'top','unset');
  //     // }
      
  //   }
  // }

  slideChange([e]: [Swiper]) {
    this.sharedService.index.next(e.realIndex);
    this.sliderIndex = e.realIndex;
    console.log(e.realIndex)
    if (e.realIndex == 1) {

      this.typeWriterTimeout = this.typeWriter('Globally Respected Doctors', 100);
    }

    if (e.realIndex == 2) {

      this.typeWriterTimeout = this.typeWriter3('Preventable Deaths', 100);
    }
  }

  clearTimeouts(timeouts: number[]) {
    if (timeouts && timeouts.length > 0) {
      for (let timeout of timeouts) {
        clearTimeout(timeout);
      }
    }
  }


  nextSlide() {
    this.swiper.swiperRef.slideNext(800);
    // this.swiper.swiperRef.slidePrev(800);
    // this.swiper.swiperRef.allowSlidePre = 1;

    // console.log(this.swiper, this.swiper?.swiperRef.activeIndex);
  }
  typeWriter(text: string, delay: number): any {

    let timeouts: any = [];

    const typing = () => {
      if (this.i1 < text.length) {
        this.title += text.charAt(this.i1);
        this.i1++;
        timeouts.push(setTimeout(typing, delay));
      }
    };

    typing();
    return timeouts;
  }
  typeWriter2(text: string, delay: number): any {


    let timeouts: any = [];

    const typing = () => {
      if (this.i2 < text.length) {
        this.title2 += text.charAt(this.i2);
        this.i2++;
        timeouts.push(setTimeout(typing, delay));
      }
    };

    typing();
    return timeouts;
  }
  typeWriter3(text: string, delay: number): any {


    let timeouts: any = [];

    const typing = () => {
      if (this.i3 < text.length) {
        this.title3 += text.charAt(this.i3);
        this.i3++;
        timeouts.push(setTimeout(typing, delay));
      }
    };

    typing();
    return timeouts;
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

  ngOnDestroy() {
    // this.resizeListener();
  }
}
