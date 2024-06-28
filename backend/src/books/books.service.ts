import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({ data: createBookDto });
  }

  async findAll() {
    return this.prismaService.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prismaService.book.findFirst({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Unable to find the book with id ${id}`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.prismaService.book.findFirst({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Unable to find the book with id ${id}`);
    }

    return this.prismaService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    const book = await this.prismaService.book.findFirst({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Unable to find the book with id ${id}`);
    }

    return this.prismaService.book.delete({ where: { id } });
  }
}
