import {TurnState, TurnStateContext} from './TurnState';

export class TurnStateAttack implements TurnState {

  constructor(private context: TurnStateContext) {

  }

  onCountrySelect(countryName: string): void {
    // unset if clicked on the same country
    if (this.context.gameService.originCountryName === countryName) {
      this.context.gameService.resetCountrySelection();
    }

    // on the first country selection, set the origin country
    if (!this.context.gameService.originCountryName) {
      this.context.gameService.originCountryName = countryName;
    } else {
      const attacker = this.context.gameService.getCountryByName(this.context.gameService.originCountryName);
      const defender = this.context.gameService.getCountryByName(countryName);

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

        this.context.gameService.changeCountryTroops(attacker.name, attacker.troops + attackerChangedTroops);
        this.context.gameService.changeCountryTroops(defender.name, defender.troops + defenderChangedTroops);

      } else {
        console.warn('The attacker country has too less troops, so ain\'t possible to attack!');
      }

      // reset the selection after the turn is done
      this.context.gameService.resetCountrySelection();
    }
  }

}
