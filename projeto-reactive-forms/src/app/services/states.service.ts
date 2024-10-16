import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { StatesList } from "../types/states-list";
import { IStatesResponse } from "../interfaces/states/states-response.interface";

@Injectable({
    providedIn: "root",
})
export class StatesService {
    constructor(
        private readonly _https: HttpClient,
    ) {}

    getStates(countryName: string): Observable<StatesList> {
        return this._https.post<IStatesResponse>("https://countriesnow.space/api/v0.1/countries/states", { country: countryName })
        .pipe(map((states) => states.data.states));
    }
}