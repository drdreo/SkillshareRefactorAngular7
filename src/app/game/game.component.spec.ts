import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GameComponent} from './game.component';
import {TurnPhaseComponent} from '../turn-phase/turn-phase.component';
import {MapComponent} from '../map/map.component';
import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {GameService} from './game.service';


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameSerivce: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent, TurnPhaseComponent, MapComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameSerivce = TestBed.get(GameService);

    fixture.detectChanges();
  });

  it('should create the game', () => {
    const game = fixture.debugElement.componentInstance;
    expect(game).toBeTruthy();
  });

  it('should reset country selection to be undefined', () => {
    gameSerivce.originCountryName = 'Brazil';
    gameSerivce.resetCountrySelection();

    expect(gameSerivce.originCountryName).not.toBeDefined();
  });

  it('should get country BRAZIL by country name', () => {
    const brazil = gameSerivce.getCountryByName('Brazil');

    expect(brazil.name).toEqual('Brazil');
    expect(brazil.troops).toEqual(3);
  });

  describe('TurnPhase', () => {

    describe('Recruit', () => {
      it('should recruit 3 troops to BRAZIL', () => {
        gameSerivce.turnPhase = TurnPhase.Recruit;
        component.onCountrySelected('Brazil');

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(6);
      });
    });

    describe('Attack', () => {
      it('should attack VENEZUELA from BRAZIL and win', () => {
        gameSerivce.turnPhase = TurnPhase.Attack;
        gameSerivce.countries.find(country => country.name === 'Venezuela').troops = 2;

        // attacker more powerful, 3 vs 2, attacker wins
        component.onCountrySelected('Brazil');    // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(2);
        expect(gameSerivce.getCountryByName('Venezuela').troops).toEqual(0);
      });

      it('should attack VENEZUELA from BRAZIL and lose', () => {
        gameSerivce.turnPhase = TurnPhase.Attack;

        // defender more powerful, 3 vs 3, defender wins
        component.onCountrySelected('Brazil');    // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(1);
        expect(gameSerivce.getCountryByName('Venezuela').troops).toEqual(2);
      });

      it('should NOT attack due to too less troops', () => {
        gameSerivce.turnPhase = TurnPhase.Attack;
        gameSerivce.countries.find(country => country.name === 'Brazil').troops = 2;

        // attacker has not enough troops, nothing should change
        component.onCountrySelected('Brazil');      // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(2);
        expect(gameSerivce.getCountryByName('Venezuela').troops).toEqual(3);
      });
    });

    describe('Maneuver', () => {
      it('should maneuver 3 from BRAZIL to PERU', () => {
        gameSerivce.turnPhase = TurnPhase.Maneuver;
        gameSerivce.countries.find(country => country.name === 'Brazil').troops = 5;

        component.onCountrySelected('Brazil');  // origin
        component.onCountrySelected('Peru');    // target

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(2);
        expect(gameSerivce.getCountryByName('Peru').troops).toEqual(6);
      });

      it('should NOT maneuver from BRAZIL to PERU', () => {
        gameSerivce.turnPhase = TurnPhase.Maneuver;

        // origin has not enough troops for maneuvering, nothing should change
        component.onCountrySelected('Brazil');  // origin
        component.onCountrySelected('Peru');    // target

        expect(gameSerivce.getCountryByName('Brazil').troops).toEqual(3);
        expect(gameSerivce.getCountryByName('Peru').troops).toEqual(3);
      });
    });

  });
});
