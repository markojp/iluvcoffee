import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Gringo Roast',
      brand: 'Rebel Brew',
      flavors: ['peach', 'macadamia nut'],
    },
    {
      id: 3,
      name: 'Moose Roast',
      brand: 'Nordic Brew',
      flavors: ['milk chocolate', 'cherry'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const changeCoffee = { ...existingCoffee, ...updateCoffeeDto };
      this.coffees = this.coffees.map((coffee) =>
        existingCoffee.id == coffee.id ? changeCoffee : coffee,
      );
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if ((coffeeIndex) => 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
