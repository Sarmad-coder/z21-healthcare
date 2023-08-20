import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgbOffcanvas, OffcanvasDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/app.service";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "app-layout1",
  templateUrl: "layout1.component.html",
  styles: [
    `
      .round {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../assets/icons/doctor.png");
      }
      .round:hover {
        opacity: 0.7;
        /* background-image: linear-gradient(rgba(249, 244, 244, 0.1), rgba(249, 244, 244, 0.5)), url("../../../assets/icons/doctor.png"); */
      }
    `,
  ],
})
export class Layout1Component implements OnInit {
  isIframeVisible=true
  closeResult = "";
  index:number=0;
  isIframeAvilable:boolean=true

  constructor(private offcanvasService: NgbOffcanvas, public service: AppService, private shareService:SharedService) {}

  ngOnInit(): void {
    this.shareService.index.subscribe({
      next: (e) => {
        console.log(e) 
        this.index=e
      }
    })
  }

  openNavbar() {
    this.service.openNavbar();
  }
  
}
