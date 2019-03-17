import {Component, OnDestroy} from '@angular/core';

import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {Country, worldCountries} from './country';
import {takeUntil} from 'rxjs/operators';
import {GameService} from './game.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'ah-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {


  private unsubscribe$ = new Subject(); // triggers the takeUntil operator


  constructor(private gameService: GameService) {
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
    switch (this.gameService.turnPhase) {
      case TurnPhase.Recruit:
        this.handleTurnRecruit(countryName);
        break;
      case TurnPhase.Attack:
        this.handleTurnAttack(countryName);
        break;
      case TurnPhase.Maneuver:
        this.handleTurnManeuver(countryName);
        break;
    }
  }

  private handleTurnRecruit(countryName: string) {
    const country = this.gameService.getCountryByName(countryName);

    // increase troops amount by 3
    this.gameService.changeCountryTroops(country.name, country.troops + 3);
  }

  private handleTurnAttack(countryName: string) {
    // unset if clicked on the same country
    if (this.gameService.originCountryName === countryName) {
      this.gameService.resetCountrySelection();
    }

    // on the first country selection, set the origin country
    if (!this.gameService.originCountryName) {
      this.gameService.originCountryName = countryName;
    } else {
      const attacker = this.gameService.getCountryByName(this.gameService.originCountryName);
      const defender = this.gameService.getCountryByName(countryName);

      // can the country attack?
      if (attacker.troops > 2) {
        let attackerChangedTroops = 0;
        let defenderChangedTroops = 0;

        if (attacker.troops > defender.troops) {
          // attacker is more powerful
          attackerChangedTroops = -1;
          defenderChangedTroops = -2;
        } else {
          // defender is more powerful
          attackerChangedTroops = -2;
          defenderChangedTroops = -1;
        }

        this.gameService.changeCountryTroops(attacker.name, attacker.troops + attackerChangedTroops);
        this.gameService.changeCountryTroops(defender.name, defender.troops + defenderChangedTroops);

      } else {
        console.warn('The attacker country has too less troops, so ain\'t possible to attack!');
      }

      // reset the selection after the turn is done
      this.gameService.resetCountrySelection();
    }
  }

  private handleTurnManeuver(countryName: string) {
    // unset if clicked on the same country
    if (this.gameService.originCountryName === countryName) {
      this.gameService.resetCountrySelection();
    }

    // on the first country selection, set the origin country
    if (!this.gameService.originCountryName) {
      this.gameService.originCountryName = countryName;
    } else {
      const origin = this.gameService.getCountryByName(this.gameService.originCountryName);
      const target = this.gameService.getCountryByName(countryName);

      if (origin.troops > 4) {
        // always maneuver 3, remove 3 from origin, add 3 to target
        this.gameService.changeCountryTroops(origin.name, origin.troops - 3);
        this.gameService.changeCountryTroops(target.name, target.troops + 3);

      } else {
        console.warn('The origin country has too less troops, it is not possible to maneuver!');
      }

      // reset the selection after the turn is done
      this.gameService.resetCountrySelection();
    }
  }


}
