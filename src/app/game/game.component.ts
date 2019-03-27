import {Component, OnDestroy} from '@angular/core';

import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {takeUntil} from 'rxjs/operators';
import {GameService} from './game.service';
import {Subject} from 'rxjs';
import {TurnStateContext} from './turn-state/TurnState';

@Component({
  selector: 'ah-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {

  // triggers the takeUntil operator
  private unsubscribe$ = new Subject();

  private turnState: TurnStateContext;

  constructor(private gameService: GameService) {

    this.turnState = new TurnStateContext(this.gameService.turnPhase, gameService);

    this.gameService.turnPhase$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((phase) => {
        this.turnState.setState(phase);
      });

    this.gameService.selectedCountry$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(countryName => {
        this.onCountrySelected(countryName);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCountrySelected(countryName: string) {
    this.turnState.onCountrySelect(countryName);
  }

}
