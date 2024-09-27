import { IsString, IsOptional, IsInt, Min } from 'class-validator';


export class CrearbarnyardsDto {
  @IsString()
  nombre: string;

  @IsInt()
  @Min(1) 
  capacidad: number;
}

export class AgregarAnimalDto {
  @IsInt()
  animalId: number;
}
