import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {NgModule} from "@angular/core";
import {TelegramService} from "./services/telegram.service";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttachmentsComponent} from "./pages/attachments/attachments.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {AppRoutingModule} from "./app-routing.module";
import {StateService} from "./services/state.service";
import {MachinesComponent} from "./pages/machines/machines.component";
import {IMaskModule} from "angular-imask";
import {UserAgentService} from "./services/user-agent.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [AppComponent, MachinesComponent, AttachmentsComponent, ContactsComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [HttpService, TelegramService, StateService, UserAgentService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
