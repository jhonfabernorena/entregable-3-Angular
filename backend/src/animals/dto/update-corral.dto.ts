import { IsOptional,IsString,IsInt } from "class-validator";

export class ActualizarAnimalDto {
    @IsOptional()
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsInt()
    edad?: number;
  
    @IsOptional()
    @IsInt()
    barnyardsId?: number; 
  }