import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./layout1Pages/home/home.component";
import { Layout1Component } from "./layout1Pages/layout1/layout1.component";
import { Layout2Component } from "./layout2Pages/layout2/layout2.component";
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

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "",
    component: Layout1Component,
    children: [{ path: "home", component: HomeComponent,data: { title: 'Z21 - Home' } }],
  },
  {
    path: "",
    component: Layout2Component,
    children: [
      { path: "oxynow", component: OxynowComponent,data: { title: 'Z21 - Solutions' } },
      { path: "oraican", component: OraicanComponent,data: { title: 'Z21 - Solutions' } },
      { path: "diabetic", component: DiabeticComponent,data: { title: 'Z21 - Solutions' } },
    ],
  },
  {
    path: "",
    component: Layout3Component,
    children: [
      { path: "about", component: AboutComponent,data: { title: 'Z21 - About' } },
      { path: "needfor", component: NeedforComponent,data: { title: 'Z21 - NeedFor' } },
      { path: "zerotoone", component: ZerotooneComponent,data: { title: 'Z21 - Zerotoone' } },
      { path: "people", component: PeopleComponent,data: { title: 'Z21 - People' } },
      { path: "founder-info", component: FounderInfoComponent,data: { title: 'Z21 - Founder-Info' } },
      { path: "contact", component: ContactComponent,data: { title: 'Z21 - Contact' } },
      { path: "privacy", component: PrivacyComponent,data: { title: 'Z21 - Privacy' } },
      { path: "terms", component: TermsComponent,data: { title: 'Z21 - Terms' } },
      { path: "partner", component: PartnerComponent,data: { title: 'Z21 - Partner' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
