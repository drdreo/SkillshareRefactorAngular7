import {Component} from '@angular/core';

import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {Country, worldCountries} from './country';

@Component({
  selector: 'ah-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  countries: Country[];
  originCountryName: string;

  turnPhase: TurnPhase;

  constructor() {
    this.turnPhase = TurnPhase.Recruit;
    this.countries = JSON.parse(JSON.stringify(worldCountries)); // create a real copy of the data
  }

  onTurnPhaseChange(turnPhase: TurnPhase) {
    this.turnPhase = turnPhase;
  }

  onCountrySelected(countryName: string) {
    switch (this.turnPhase) {
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
    const country = this.getCountryByName(countryName);

    // increase troops amount by 3
    this.changeCountryTroops(country, country.troops + 3);
  }

  private handleTurnAttack(countryName: string) {

    // unset if clicked on the same country
    if (this.originCountryName === countryName) {
      this.resetCountrySelection();
    }

    // on the first country selection, set the origin country
    if (!this.originCountryName) {
      this.originCountryName = countryName;
    } else {
      const attacker = this.getCountryByName(this.originCountryName);
      const defender = this.getCountryByName(countryName);

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

        this.changeCountryTroops(attacker, attacker.troops + attackerChangedTroops);
        this.changeCountryTroops(defender, defender.troops + defenderChangedTroops);

      } else {
        console.warn('The attacker country has to less troops, so ain\'t possible to attack!');
      }

      // reset the selection after the turn is done
      this.resetCountrySelection();
    }
  }

  private handleTurnManeuver(countryName: string) {

    // unset if clicked on the same country
    if (this.originCountryName === countryName) {
      this.resetCountrySelection();
    }

    // on the first country selection, set the origin country
    if (!this.originCountryName) {
      this.originCountryName = countryName;
    } else {
      const origin = this.getCountryByName(this.originCountryName);
      const target = this.getCountryByName(countryName);

      if (origin.troops > 4) {
        // always maneuver 3, remove 3 from origin, add 3 to target
        this.changeCountryTroops(origin, origin.troops - 3);
        this.changeCountryTroops(target, target.troops + 3);

      } else {
        console.warn('The origin country has to less troops, it is not possible to maneuver!');
      }

      // reset the selection after the turn is done
      this.resetCountrySelection();
    }
  }

  private changeCountryTroops(country: Country, troops: number) {
    country.troops = troops;
  }


  getCountryByName(countryName: string): Country {
    return this.countries.find(country => country.name === countryName);
  }

  resetCountrySelection() {
    this.originCountryName = undefined;
  }


}
