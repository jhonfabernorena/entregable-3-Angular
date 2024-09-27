import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { barnyardsService } from './barnyard.service';
import { CrearbarnyardsDto } from './dto/create-barnyard.dto';
import { CrearAnimalDto } from 'src/animals/dto/create-animal.dto';

@Controller('barnyards')
export class barnyardsController {
  constructor(private readonly barnyardsService: barnyardsService) {}

  @Post()
  async agregarbarnyards(@Body() crearbarnyardsDto: CrearbarnyardsDto) {
    return this.barnyardsService.agregarbarnyards(crearbarnyardsDto);
  }

  @Post(':id/animales')
  async agregarAnimal(
      @Param('id') barnyardsId: number,
      @Body() agregarAnimalDto: CrearAnimalDto,
  ) {
      return this.barnyardsService.agregarAnimal(barnyardsId, agregarAnimalDto);
  }

  @Get()
  async listarbarnyardses() {
    return this.barnyardsService.listarbarnyardses(); 
  }
  

  @Get(':id/estadisticas')
  async obtenerEstadisticas(@Param('id') barnyardsId: number) {
    return this.barnyardsService.obtenerEstadisticasbarnyards(barnyardsId);
  }

  @Get(':id/animales')
  async obtenerAnimalesPorbarnyards(@Param('id') barnyardsId: number) {
    return this.barnyardsService.obtenerAnimalesPorbarnyards(barnyardsId);
  }


  @Delete(':id')
  async eliminarbarnyards(@Param('id') id: number) {
    return this.barnyardsService.eliminarbarnyards(id);
  }
}
