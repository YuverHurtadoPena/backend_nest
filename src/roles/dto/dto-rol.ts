import { IsNotEmpty, IsString } from 'class-validator';
export class DtoRol {
  id: number;

  @IsString({ message: 'El nuevo nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nuevo nombre no puede estar vacío' })
  name: string;
}
