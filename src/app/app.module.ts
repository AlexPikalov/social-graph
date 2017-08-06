import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, combineReducers } from '@ngrx/store';

import { appReducer } from './app.state';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls';
import { GraphEffects, GraphService } from './graph';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.run(GraphEffects),
    StoreModule.provideStore(appReducer)
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
