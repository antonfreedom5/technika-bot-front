import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {AttachmentsComponent} from "./pages/attachments/attachments.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {MachinesComponent} from "./pages/machines/machines.component";

const routes: Routes =[
  { path: "", component: MachinesComponent},
  { path: "attachments", component: AttachmentsComponent},
  { path: "contacts", component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
