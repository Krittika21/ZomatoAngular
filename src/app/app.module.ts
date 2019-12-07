import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { Authorization } from './shared/Interceptor/authorization.interceptor';
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RestaurantsModule,
    AdminModule,
    AccountModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule 
    
  ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS, useClass: Authorization, multi:true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
