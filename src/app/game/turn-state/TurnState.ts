import {TurnPhase} from '../../turn-phase/turn-phase.enum';
import {GameService} from '../game.service';
import {TurnStateRecruit} from './TurnStateRecruit';
import {TurnStateAttack} from './TurnStateAttack';
import {TurnStateManeuver} from './TurnStateManeuver';

export interface TurnState {
  onCountrySelect(countryName: string): void;
}

export class TurnStateContext implements TurnState {

  get state(): TurnState {
    return this._state;
  }

  set state(value: TurnState) {
    this._state = value;
  }

  private _state: TurnState;

  constructor(public phase: TurnPhase, readonly gameService: GameService) {
    this.setState(phase);
  }

  setState(phase: TurnPhase) {
    switch (phase) {
      case TurnPhase.Recruit:
        this.state = new TurnStateRecruit(this);
        break;
      case TurnPhase.Attack:
        this.state = new TurnStateAttack(this);
        break;
      case TurnPhase.Maneuver:
        this.state = new TurnStateManeuver(this);
        break;

    }
  }

  onCountrySelect(countryName: string): void {
    this.state.onCountrySelect(countryName);
  }
}
