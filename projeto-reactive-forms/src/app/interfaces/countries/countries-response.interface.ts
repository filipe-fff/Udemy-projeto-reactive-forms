import { CountriesList } from "../../types/countries-list";
import { ICountriesResponseBase } from "../countries-response-base.interface";

export interface ICountriesResponse extends ICountriesResponseBase {
    data: CountriesList;
}