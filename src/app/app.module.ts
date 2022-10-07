import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrivateModule } from './private/private.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PrivateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
