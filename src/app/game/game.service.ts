import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {TurnPhase} from '../turn-phase/turn-phase.enum';
import {Country, worldCountries} from './country';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  get countries(): Country[] {
    return this._countries$.getValue();
  }

  get turnPhase(): TurnPhase {
    return this._turnPhase$.getValue();
  }

  set turnPhase(value: TurnPhase) {
    this._turnPhase$.next(value);
  }


  private _turnPhase$ = new BehaviorSubject<TurnPhase>(TurnPhase.Recruit);
  turnPhase$ = this._turnPhase$.asObservable();

  private _countries$ = new BehaviorSubject<Country[]>(JSON.parse(JSON.stringify(worldCountries)));
  countries$ = this._countries$.asObservable();

  private _selectedCountry$ = new Subject<string>();
  selectedCountry$ = this._selectedCountry$.asObservable();


  originCountryName: string;

  constructor() {
  }

  selectCountry(country: string) {
    this._selectedCountry$.next(country);
  }

  getCountryByName(countryName: string) {
    return this.countries.find(country => country.name === countryName);
  }

  changeCountryTroops(countryName: string, troops: number) {
    this.getCountryByName(countryName).troops = troops;
    this._countries$.next(this.countries);
  }

  resetCountrySelection() {
    this.originCountryName = undefined;
  }

}
