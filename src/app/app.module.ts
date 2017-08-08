import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, combineReducers } from '@ngrx/store';

import { reducer } from './app.state';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls';
import {
  NetworkEffects,
  NetworkService,
  TagCloudComponent,
  GraphComponent
} from './network';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    // GraphComponent,
    TagCloudComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.run(NetworkEffects),
    StoreModule.provideStore(reducer)
  ],
  providers: [NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
