import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { barnyards } from 'src/barnyards/entities/barnyard.entity';
import { In, Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CrearAnimalDto } from './dto/create-animal.dto';
import { ActualizarAnimalDto } from './dto/update-corral.dto';


@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,

    @InjectRepository(barnyards)
    private barnyardsRepository: Repository<barnyards>,
  ) {}

  async agregarAnimal(barnyardsId: number, crearAnimalDto: CrearAnimalDto) {
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

    const animal = new Animal();
    animal.nombre = crearAnimalDto.nombre;
    animal.edad = crearAnimalDto.edad;
    animal.barnyards = barnyards;

    if (crearAnimalDto.noCompatibles) {
        await this.verificarCompatibilidad(animal, barnyards.animales, crearAnimalDto.noCompatibles);
    }

    return this.animalRepository.save(animal);
}

private async verificarCompatibilidad(animal: Animal, animalesDelbarnyards: Animal[], noCompatibles: number[]) {
  console.log('Verificando compatibilidad para el animal:', animal);
  console.log('Animales del barnyards:', animalesDelbarnyards);
  console.log('No compatibles:', noCompatibles);

  const incompatibles = await this.animalRepository.find({
    where: {
      id: In(noCompatibles),
    },
  });

  console.log('Animales incompatibles:', incompatibles);

  for (const existente of animalesDelbarnyards) {
    if (incompatibles.some(incompatible => incompatible.id === existente.id)) {
      throw new BadRequestException(
        `El animal ${animal.nombre} no puede convivir con el animal ${existente.nombre}.`,
      );
    }
  }
}


  async obtenerTodosLosAnimales(): Promise<Animal[]> {
    return this.animalRepository.find({ relations: ['barnyards'] });
  }

  async obtenerAnimalPorId(id: number): Promise<Animal> {

    const animal = await this.animalRepository.findOne({ where: { id }, relations: ['barnyards'] });
    
    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }

    return animal;
  }

  async actualizarAnimal(id: number, actualizarAnimalDto: ActualizarAnimalDto) {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }

    const { nombre, edad, barnyardsId } = actualizarAnimalDto; 

    if (nombre) animal.nombre = nombre;
    if (edad) animal.edad = edad;

    if (barnyardsId) {
      const barnyards = await this.barnyardsRepository.findOne({ where: { id: barnyardsId } });
      if (!barnyards) {
        throw new BadRequestException('barnyards no encontrado');
      }
      animal.barnyards = barnyards;
    }

    return this.animalRepository.save(animal);
  }

  async eliminarAnimal(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id } });
    
    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }
    
    return this.animalRepository.remove(animal);
  }

  async actualizarCompatibilidad(animalId: number, noCompatibles: number[]) {
    const animal = await this.animalRepository.findOne({
        where: { id: animalId },
        relations: ['noCompatibles'],
    });
    
    if (!animal) {
        throw new BadRequestException('El animal no existe.');
    }
    
    const incompatibles = await this.animalRepository.findByIds(noCompatibles);
    animal.noCompatibles = incompatibles;
    
    return this.animalRepository.save(animal);
}

}
