import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {NgModule} from "@angular/core";
import {TelegramService} from "./services/telegram.service";
import {HomeComponent} from "./pages/home/home.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttachmentsComponent} from "./pages/attachments/attachments.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {AppRoutingModule} from "./app-routing.module";
import {StateService} from "./services/state.service";
import {MachinesComponent} from "./pages/machines/machines.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, MachinesComponent, AttachmentsComponent, ContactsComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, TelegramService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
