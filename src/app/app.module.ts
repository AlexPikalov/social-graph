import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls';
import { GraphEffects } from './graph';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.run(GraphEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
