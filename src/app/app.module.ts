import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { routes } from './app.router';
import { PrizeService } from './prize/prize.service';
import { LogService } from './prize/log.service';

import { AppComponent } from './app.component';
import { PrizeComponent } from './prize/prize.component';
import { PrizeNewComponent } from './prize/prize-new/prize-new.component';
import { PrizeListComponent } from './prize/prize-list/prize-list.component';
import { PrizeEditComponent } from './prize/prize-edit/prize-edit.component';
import { PrizeDetailsComponent } from './prize/prize-details/prize-details.component';
import { HomeComponent } from './home/home.component';
import 'rxjs/add/operator/map';
import { LogListComponent } from './prize/log-list/log-list.component';
@NgModule({
  declarations: [
    AppComponent,
    PrizeComponent,
    PrizeNewComponent,
    PrizeListComponent,
    PrizeEditComponent,
    PrizeDetailsComponent,
    HomeComponent,
    LogListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    routes
  ],
  providers: [
    PrizeService, LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
