import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Layout1Component } from "./layout1Pages/layout1/layout1.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SwiperModule } from "swiper/angular";
import { Layout2Component } from "./layout2Pages/layout2/layout2.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { HomeComponent } from "./layout1Pages/home/home.component";
import { OxynowComponent } from "./layout2Pages/oxynow/oxynow.component";
import { OraicanComponent } from "./layout2Pages/oraican/oraican.component";
import { AboutComponent } from "./layout3Pages/about/about.component";
import { Layout3Component } from "./layout3Pages/layout3/layout3.component";
import { NeedforComponent } from "./layout3Pages/needfor/needfor.component";
import { ZerotooneComponent } from "./layout3Pages/zerotoone/zerotoone.component";
import { PeopleComponent } from "./layout3Pages/people/people.component";
import { ContactComponent } from "./layout3Pages/contact/contact.component";
import { PrivacyComponent } from "./layout3Pages/privacy/privacy.component";
import { TermsComponent } from "./layout3Pages/terms/terms.component";
import { PartnerComponent } from "./layout3Pages/partner/partner.component";
import { DiabeticComponent } from "./layout2Pages/diabetic/diabetic.component";
import { FounderInfoComponent } from "./layout3Pages/founder-info/founder-info.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [AppComponent, Layout1Component, Layout2Component, HomeComponent, OxynowComponent, OraicanComponent, AboutComponent, Layout3Component, NeedforComponent, ZerotooneComponent, PeopleComponent, ContactComponent, PrivacyComponent, TermsComponent, PartnerComponent, DiabeticComponent, FounderInfoComponent],
  imports: [BrowserModule, NgbModule, BrowserAnimationsModule, SwiperModule, RouterModule, AppRoutingModule, ReactiveFormsModule, ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
