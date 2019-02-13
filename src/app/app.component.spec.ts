import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {TurnPhaseComponent} from './turn-phase/turn-phase.component';
import {MapComponent} from './map/map.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, GameComponent, TurnPhaseComponent, MapComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });


});
