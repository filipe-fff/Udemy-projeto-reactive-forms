import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CitiesList } from "../types/cities-list";
import { ICitiesResponse } from "../interfaces/cities/cities-response.interface";

@Injectable({
    providedIn: "root",
})
export class CitiesService {
    _https = inject(HttpClient);

    getCities(countryName: string, stateName: string): Observable<CitiesList> {
        return this._https.post<ICitiesResponse>("https://countriesnow.space/api/v0.1/countries/state/cities", {country: countryName, state: stateName})
        .pipe(map((cities) => {
            return cities?.data;
        }));
    }
}