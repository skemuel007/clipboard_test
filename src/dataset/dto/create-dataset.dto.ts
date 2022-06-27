import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDatasetDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  salary: number;
  @IsString()
  currency: string;
  @IsString()
  @IsNotEmpty()
  department: string;
  @IsOptional()
  on_contract?: boolean;
  @IsOptional()
  sub_department: string;
}
