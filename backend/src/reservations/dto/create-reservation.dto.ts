import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservationDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    book_id: number;

    @IsDateString()
    @IsNotEmpty()
    reservation_date: Date;

    @IsDateString()
    @IsNotEmpty()
    return_date: Date;
}
