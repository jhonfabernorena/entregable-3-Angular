import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { barnyards } from './entities/barnyard.entity';
import { Animal } from 'src/animals/entities/animal.entity';
import { CrearbarnyardsDto } from './dto/create-barnyard.dto';
import { CrearAnimalDto } from 'src/animals/dto/create-animal.dto';

@Injectable()
export class barnyardsService {
  constructor(
    @InjectRepository(barnyards)
    private barnyardsRepository: Repository<barnyards>,

    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async agregarbarnyards(crearbarnyardsDto: CrearbarnyardsDto) {
    const { nombre, capacidad } = crearbarnyardsDto;
    const barnyards = this.barnyardsRepository.create({ nombre, capacidad });
    return this.barnyardsRepository.save(barnyards);
  }

  async agregarAnimal(barnyardsId: number, crearAnimalDto: CrearAnimalDto) {
    const { nombre, edad } = crearAnimalDto;
    const animal = this.animalRepository.create({ nombre, edad });

    const barnyards = await this.barnyardsRepository.findOne({
      where: { id: barnyardsId },
      relations: ['animales'],
    });

    if (!barnyards) {
      throw new BadRequestException('El barnyards no existe.');
    }

    if (barnyards.animales.length >= barnyards.capacidad) {
      throw new BadRequestException(
        `El barnyards ${barnyards.nombre} ha alcanzado su capacidad máxima de ${barnyards.capacidad} animales.`,
      );
    }

    animal.barnyards = barnyards;

    await this.animalRepository.save(animal);
    barnyards.animales.push(animal);
    await this.barnyardsRepository.save(barnyards);

    return {
      id: animal.id,
      nombre: animal.nombre,
      edad: animal.edad,
      barnyardsId: barnyards.id,
    };
  }

  async obtenerEstadisticasbarnyards(barnyardsId: number) {
    const barnyards = await this.barnyardsRepository.findOne({
      where: { id: barnyardsId },
      relations: ['animales'],
    });
    const cantidadAnimales = barnyards.animales.length;
    const promedioEdad =
      barnyards.animales.reduce((sum, animal) => sum + animal.edad, 0) /
      cantidadAnimales;

    return { cantidadAnimales, promedioEdad };
  }

  async listarbarnyardses(): Promise<any[]> {
    const barnyardses = await this.barnyardsRepository.find();

    const estadisticasPromises = barnyardses.map(async (barnyards) => {
      const estadisticas = await this.obtenerEstadisticasbarnyards(barnyards.id);
      return {
        ...barnyards,
        cantidadAnimales: estadisticas.cantidadAnimales,
        promedioEdad: estadisticas.promedioEdad,
      };
    });

    return Promise.all(estadisticasPromises);
  }
  async obtenerAnimalesPorbarnyards(barnyardsId: number): Promise<Animal[]> {
    const barnyards = await this.barnyardsRepository.findOne({
      where: { id: barnyardsId },
      relations: ['animales'],
    });

    if (!barnyards) {
      throw new BadRequestException('El barnyards no fue encontrado.');
    }

    return barnyards.animales;
  }

  async eliminarbarnyards(barnyardsId: number) {
    const barnyards = await this.barnyardsRepository.findOne({
      where: { id: barnyardsId },
      relations: ['animales'],
    });

    if (!barnyards) {
      throw new BadRequestException('El barnyards no existe.');
    }

    await this.animalRepository.delete({ barnyards: { id: barnyardsId } });

    await this.barnyardsRepository.delete(barnyardsId);

    return { message: 'barnyards y animales asociados eliminados con éxito.' };
  }
}
