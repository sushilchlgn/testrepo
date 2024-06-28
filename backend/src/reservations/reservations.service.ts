import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    const user = await this.prismaService.user.findFirst({
      where: { id: createReservationDto.user_id },
    })

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const book = await this.prismaService.book.findFirst({
      where: { id: createReservationDto.book_id },
    })

    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    return this.prismaService.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll() {
    return this.prismaService.reservation.findMany({
      include: {
        user: true,
        book: true,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
