import { DishesOrdered } from './dishes-ordered.model';

export class Cart {
    RestaurantID : number;
    UserID : string;
    UserName : string;
    DishesOrdered : DishesOrdered[];
}
