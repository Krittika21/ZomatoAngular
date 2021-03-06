import { AllCity } from './AllCity.model';
import { AllCountry } from './AllCountry.model';
import { Review } from './review.model';

export class AllDetails {
    ID:number;
    Locality: string;
    RestaurantName: string;

    ContactNumber:string;
    CuisineType:string;
    AverageCost:string;
    OpeningHours:string;
    MoreInfo:string;

    City: AllCity;  
    Country: AllCountry;
    AllReviews: Review[];      
}