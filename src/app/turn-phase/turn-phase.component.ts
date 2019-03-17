import {Component} from '@angular/core';

import {TurnPhase} from './turn-phase.enum';
import {GameService} from '../game/game.service';

@Component({
  selector: 'turn-phase',
  templateUrl: './turn-phase.component.html',
  styleUrls: ['./turn-phase.component.scss']
})
export class TurnPhaseComponent {

  TurnPhase = TurnPhase; // this makes the TurnPhase enum accessible within the template

  constructor(private gameService: GameService) {
  }

  triggerPhase(turnPhase: TurnPhase) {
    this.gameService.turnPhase = turnPhase;
  }

  isActive(phase: TurnPhase) {
    // console.log("isActive called");
    return this.gameService.turnPhase === phase;
  }
}
