import { DOCUMENT } from "@angular/common";
import { Component, Inject, NgZone, OnInit } from "@angular/core";
import { EmailValidator, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterState } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/app.service";
declare let gtag: Function;
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styles: [
    `
      .form-control {
        border-left: 0px;
        border-right: 0px;
        border-top: 0px;
        padding-left: 0px !important;
        border-radius: 0px;
      }
      .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    `,
  ],
})
export class ContactComponent implements OnInit {
  constructor(private service: AppService, private zone: NgZone, 
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
    ){
      this.handleRouteEvents();
    }

  data = new FormGroup(
    {
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      message: new FormControl("", [Validators.required]),
    },
    { updateOn: "blur" }
  );

  // data = {
  //   name: '',
  //   email: '',
  //   message:''

  // }
  ngOnInit(): void {}
  openNavbar() {
    this.service.openNavbar();
  }
  moveToHome() {
    this.zone.run(() => {
      this.router.navigate(["/home"]);
    });
  }

  sendEmail() {

    this.showError = true;
    setTimeout(() => {

      this.showError = false
      
    }, 2000);
    console.log(this.data.value.message);
    if (this.data.valid) {
      window.location.href = `mailto:greenjazzinfo+z21@gmail.com?subject=New message from Z21 website Contact page&body=Name:  ${this.data.value.name} Email:  ${this.data.value.email} Message:  ${this.data.value.message}`;
      this.toastr.success("Your message has been sent successfully. ", "Thank you!", {
        positionClass: "toast-bottom-left",
      });
    } else {
      // this.toastr.error("Sorry, your message was not sent.", "Please try again", {
      //   positionClass: "toast-bottom-left",
      // });
    }
  }

  showError = false;

  hasError(controlName: string) {
    const control = this.data?.get(controlName);
    const result = control?.invalid && control?.errors;
    return result ? control : undefined;
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
