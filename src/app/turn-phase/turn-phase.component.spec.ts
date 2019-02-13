import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TurnPhaseComponent} from './turn-phase.component';
import {TurnPhase} from './turn-phase.enum';
import {By} from '@angular/platform-browser';

describe('TurnPhaseComponent', () => {
  let component: TurnPhaseComponent;
  let fixture: ComponentFixture<TurnPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TurnPhaseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the attack phase active', () => {
    component.phase = TurnPhase.Attack;

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.is-active .phase__title').innerText).toEqual('Attack');
  });

  it('should send TurnPhase.Recruit as phaseChange event on clicking recruit', () => {
    const phaseBtn = fixture.debugElement.query(By.css('a'));

    component.phaseChange.subscribe((phase: TurnPhase) => {
      expect(phase).toEqual(TurnPhase.Recruit);
    });

    phaseBtn.triggerEventHandler('click', null);

  });
});
