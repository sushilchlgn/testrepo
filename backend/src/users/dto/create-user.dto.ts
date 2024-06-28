import { Course, Semester } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(Course)
    @IsNotEmpty()
    course: Course;

    @IsEnum(Semester)
    @IsNotEmpty()
    semester: Semester;
}
