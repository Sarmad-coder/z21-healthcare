import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterState } from "@angular/router";
import { AppService } from "src/app/app.service";
declare let gtag: Function;
@Component({
  selector: "app-partner",
  templateUrl: "./partner.component.html",
  styles: [],
})
export class PartnerComponent implements OnInit {
  constructor(private service: AppService, private changeDetectorRef: ChangeDetectorRef, public router: Router, private zone: NgZone,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
    ){
      this.handleRouteEvents();
    }

  ngOnInit(): void {}

  public isActive(base: string): boolean {
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
