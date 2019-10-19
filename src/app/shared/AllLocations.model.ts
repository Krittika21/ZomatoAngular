import { AllCity } from './AllCity.model';
import { AllCountry } from './AllCountry.model';

export class AllLocation {
    ID:number;
    Locality: string;
    RestaurantName: string;
    CityName: AllCity;  
    CountryName: AllCountry;       
}