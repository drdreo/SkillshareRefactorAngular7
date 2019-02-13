import {Component, EventEmitter, Input, Output} from '@angular/core';

import {TurnPhase} from './turn-phase.enum';

@Component({
  selector: 'turn-phase',
  templateUrl: './turn-phase.component.html',
  styleUrls: ['./turn-phase.component.scss']
})
export class TurnPhaseComponent {

  @Input() phase: TurnPhase;
  @Output() phaseChange = new EventEmitter<TurnPhase>();

  TurnPhase = TurnPhase; // this makes the TurnPhase enum accessible within the template

  constructor() {
  }

  triggerPhase(turnPhase: TurnPhase) {
    this.phaseChange.emit(turnPhase);
  }

  isActive(phase: TurnPhase) {
    // console.log("isActive called");
    return this.phase === phase;
  }
}
