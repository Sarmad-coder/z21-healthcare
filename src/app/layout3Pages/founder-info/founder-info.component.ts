import { DOCUMENT } from "@angular/common";
import { Component, Inject, NgZone, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterState } from "@angular/router";
import { AppService } from "src/app/app.service";
declare let gtag: Function;
@Component({
  selector: "app-founder-info",
  templateUrl: "./founder-info.component.html",
  styles: [],
})
export class FounderInfoComponent implements OnInit {
  constructor(private service: AppService, 
    private zone: NgZone,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
    ){
      this.handleRouteEvents();
    }

  ngOnInit(): void {}
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
