import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [BooksModule, PrismaModule, UsersModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
