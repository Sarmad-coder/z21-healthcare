import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { Layout1Component } from "./layout1.component";

const layout1Routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "",
    component: Layout1Component,
    children: [{ path: "home", component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(layout1Routes)],
  exports: [RouterModule],
})
export class layout1RoutingModule {}
