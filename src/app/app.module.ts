import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MapComponent } from './map/map.component';
import { TurnPhaseComponent } from './turn-phase/turn-phase.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, GameComponent, MapComponent, TurnPhaseComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
