import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TurnPhaseComponent} from './turn-phase.component';
import {TurnPhase} from './turn-phase.enum';
import {GameService} from '../game/game.service';

describe('TurnPhaseComponent', () => {
  let component: TurnPhaseComponent;
  let fixture: ComponentFixture<TurnPhaseComponent>;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TurnPhaseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPhaseComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the attack phase active', () => {
    gameService.turnPhase = TurnPhase.Attack;

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.is-active .phase__title').innerText).toEqual('Attack');
  });

  it('should update the TurnPhase to Maneuver', () => {
    component.triggerPhase(TurnPhase.Maneuver);

    expect(gameService.turnPhase).toEqual(TurnPhase.Maneuver);
  });

  it('should check if TurnPhase is active', () => {
    gameService.turnPhase = TurnPhase.Maneuver;

    expect(component.isActive(TurnPhase.Maneuver)).toEqual(true);
  });
});
