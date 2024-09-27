import { CitiesList } from "../../types/cities-list";
import { ICountriesResponseBase } from "../countries-response-base.interface";

export interface ICitiesResponse extends ICountriesResponseBase {
    data: CitiesList;
}