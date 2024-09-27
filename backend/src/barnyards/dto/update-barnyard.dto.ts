import { PartialType } from '@nestjs/mapped-types';
import { CrearbarnyardsDto } from './create-barnyard.dto';

export class UpdatebarnyardsDto extends PartialType(CrearbarnyardsDto) {}
