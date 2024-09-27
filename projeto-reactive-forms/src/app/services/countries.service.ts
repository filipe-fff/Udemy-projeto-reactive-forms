import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CountriesList } from "../types/countries-list";
import { ICountriesResponse } from "../interfaces/countries/countries-response.interface";

@Injectable({
    providedIn: "root",
})
export class CountriesService {
    _https: HttpClient = inject(HttpClient);

    getCountries():Observable<CountriesList> {
        return this._https.get<ICountriesResponse>("https://countriesnow.space/api/v0.1/countries/positions")
        .pipe(map((coutries) => coutries?.data));
    }
}