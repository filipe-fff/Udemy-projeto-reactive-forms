import { ICountriesResponseBase } from "../countries-response-base.interface";
import { IStatesData } from "./states-data.interface";

export interface IStatesResponse extends ICountriesResponseBase {
    data: IStatesData;
}