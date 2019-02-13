import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GameComponent} from './game.component';
import {TurnPhaseComponent} from '../turn-phase/turn-phase.component';
import {MapComponent} from '../map/map.component';
import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {worldCountries} from './country';


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

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

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const game = fixture.debugElement.componentInstance;
    expect(game).toBeTruthy();
  });

  it('should reset country selection to be undefined', () => {
    component.originCountryName = 'Brazil';
    component.resetCountrySelection();

    expect(component.originCountryName).not.toBeDefined();
  });

  it('should get country BRAZIL by country name', () => {
    const brazil = component.getCountryByName('Brazil');

    expect(brazil.name).toEqual('Brazil');
    expect(brazil.troops).toEqual(3);
  });

  describe('TurnPhase', () => {

    describe('Recruit', () => {
      it('should recruit 3 troops to BRAZIL', () => {
        component.turnPhase = TurnPhase.Recruit;
        component.onCountrySelected('Brazil');

        expect(component.getCountryByName('Brazil').troops).toEqual(6);
      });
    });

    describe('Attack', () => {
      it('should attack VENEZUELA from BRAZIL and win', () => {
        component.turnPhase = TurnPhase.Attack;
        component.countries.find(cntry => cntry.name === 'Venezuela').troops = 2;

        // attacker more powerful, 3 vs 2, attacker wins
        component.onCountrySelected('Brazil');    // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(component.getCountryByName('Brazil').troops).toEqual(2);
        expect(component.getCountryByName('Venezuela').troops).toEqual(0);
      });

      it('should attack VENEZUELA from BRAZIL and lose', () => {
        component.turnPhase = TurnPhase.Attack;

        // defender more powerful, 3 vs 3, defender wins
        component.onCountrySelected('Brazil');    // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(component.getCountryByName('Brazil').troops).toEqual(1);
        expect(component.getCountryByName('Venezuela').troops).toEqual(2);
      });

      it('should NOT attack due to too less troops', () => {
        component.turnPhase = TurnPhase.Attack;
        component.countries.find(cntry => cntry.name === 'Brazil').troops = 2;

        // attacker has not enough troops, nothing should change
        component.onCountrySelected('Brazil');      // attacker
        component.onCountrySelected('Venezuela'); // defender

        expect(component.getCountryByName('Brazil').troops).toEqual(2);
        expect(component.getCountryByName('Venezuela').troops).toEqual(3);
      });
    });

    describe('Maneuver', () => {
      it('should maneuver 3 from BRAZIL to PERU', () => {
        component.turnPhase = TurnPhase.Maneuver;
        component.countries.find(cntry => cntry.name === 'Brazil').troops = 5;

        component.onCountrySelected('Brazil');      // attacker
        component.onCountrySelected('Peru'); // defender

        expect(component.getCountryByName('Brazil').troops).toEqual(2);
        expect(component.getCountryByName('Peru').troops).toEqual(6);
      });

      it('should NOT maneuver from BRAZIL to PERU', () => {
        component.turnPhase = TurnPhase.Maneuver;

        // attacker has not enough troops, nothing should change
        component.onCountrySelected('Brazil');      // attacker
        component.onCountrySelected('Peru'); // defender

        expect(component.getCountryByName('Brazil').troops).toEqual(3);
        expect(component.getCountryByName('Peru').troops).toEqual(3);
      });
    });


  });
});
