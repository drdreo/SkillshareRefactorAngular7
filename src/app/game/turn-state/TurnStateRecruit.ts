import {TurnState, TurnStateContext} from './TurnState';

export class TurnStateRecruit implements TurnState {

  constructor(private context: TurnStateContext) {

  }

  onCountrySelect(countryName: string): void {
    const country = this.context.gameService.getCountryByName(countryName);

    // increase troops by 3
    this.context.gameService.changeCountryTroops(country.name, country.troops + 3);
  }

}
