import {TurnState, TurnStateContext} from './TurnState';

export class TurnStateManeuver implements TurnState {

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
      const origin = this.context.gameService.getCountryByName(this.context.gameService.originCountryName);
      const target = this.context.gameService.getCountryByName(countryName);

      if (origin.troops > 4) {
        // always maneuver 3, remove 3 from origin, add 3 to target
        this.context.gameService.changeCountryTroops(origin.name, origin.troops - 3);
        this.context.gameService.changeCountryTroops(target.name, target.troops + 3);

      } else {
        console.warn('The origin country has too less troops, it is not possible to maneuver!');
      }

      // reset the selection after the turn is done
      this.context.gameService.resetCountrySelection();
    }
  }

}
