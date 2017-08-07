import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, combineReducers } from '@ngrx/store';

import { appReducer } from './app.state';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls';
import { NetworkEffects, NetworkService, DonutChartComponent } from './network';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    DonutChartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.run(NetworkEffects),
    StoreModule.provideStore(appReducer())
  ],
  providers: [NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
