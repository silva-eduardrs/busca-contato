import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoadingModule } from './shared/components/loading/loading.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    LoadingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
