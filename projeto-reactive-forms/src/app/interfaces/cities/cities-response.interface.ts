import { CitiesList } from "../../types/citiesList";
import { ICountriesResponseBase } from "../countries-response-base.interface";

export interface ICitiesResponse extends ICountriesResponseBase {
    data: CitiesList;
}