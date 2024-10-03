import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICitiesResponse } from "../interfaces/cities/cities-response.interface";
import { CitiesList } from "../types/citiesList";

@Injectable({
    providedIn: "root",
})
export class CitiesService {
    constructor(
        private readonly _https: HttpClient,
    ) {}

    getCities(countryName: string, stateName: string): Observable<CitiesList> {
        return this._https.post<ICitiesResponse>("https://countriesnow.space/api/v0.1/countries/state/cities", {country: countryName, state: stateName})
        .pipe(map((cities) => {
            return cities.data;
        }));
    }
}