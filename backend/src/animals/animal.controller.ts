import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CrearAnimalDto } from './dto/create-animal.dto';
import { ActualizarAnimalDto } from './dto/update-corral.dto';


@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post(':barnyardsId')
  async agregarAnimal(
    @Param('barnyardsId') barnyardsId: number,
    @Body() crearAnimalDto: CrearAnimalDto,
  ) {
    return this.animalService.agregarAnimal(barnyardsId, crearAnimalDto);
  }

  @Get()
  async obtenerTodosLosAnimales() {
    return this.animalService.obtenerTodosLosAnimales();
  }

  @Get(':id')
  async obtenerAnimal(@Param('id') id: number) {
    return this.animalService.obtenerAnimalPorId(id);
  }

  @Put(':id')
  async actualizarAnimal(
    @Param('id') id: number,
    @Body() actualizarAnimalDto: ActualizarAnimalDto,
  ) {
    return this.animalService.actualizarAnimal(id, actualizarAnimalDto);
  }

  @Delete(':id')
  async eliminarAnimal(@Param('id') id: number) {
    return this.animalService.eliminarAnimal(id);
  }

  @Post(':id/compatibilidad')
  async actualizarCompatibilidad(
    @Param('id') animalId: number,
    @Body() compatibilidadDto: { noCompatibles: number[] },
  ) {
    return this.animalService.actualizarCompatibilidad(
      animalId,
      compatibilidadDto.noCompatibles,
    );
  }
}
