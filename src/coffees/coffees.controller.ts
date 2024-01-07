import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
//import { FastifyReply, FastifyRequest } from 'fastify';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesServices: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesServices.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    //console.log(typeof id);
    return this.coffeesServices.findOne('' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    //console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesServices.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesServices.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesServices.remove(id);
  }

  // @Get('categories')
  // getAllCategories(
  //   @Req() request: FastifyRequest,
  //   @Res() response: FastifyReply,
  // ) {
  //   console.log(`${request.method} ${request.url}`);
  //   response.code(200).send('This action returns all categories');
  // }
}
