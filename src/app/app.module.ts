import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./services/http.service";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import { TelegramService } from "./services/telegram.service";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AttachmentsComponent } from "./pages/attachments/attachments.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { AppRoutingModule } from "./app-routing.module";
import { StateService } from "./services/state.service";
import { MachinesComponent } from "./pages/machines/machines.component";
import { IMaskModule } from "angular-imask";
import { UserAgentService } from "./services/user-agent.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { SuccessDialogComponent } from "./shared/success-dialog/success-dialog.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CardComponent } from "./components/card/card.component";
import { SearchService } from "./services/search.service";
import { AppConfigService } from "./services/app-config.service";

// eslint-disable-next-line @typescript-eslint/typedef
const appInitializerFn = (appConfig: AppConfigService) => {
  return async(): Promise<void>  => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    MachinesComponent,
    AttachmentsComponent,
    ContactsComponent,
    SuccessDialogComponent,
    CategoriesComponent,
    CardComponent
  ],
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
  providers: [
    HttpService,
    TelegramService,
    StateService,
    UserAgentService,
    provideAnimationsAsync(),
    SearchService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService],
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
