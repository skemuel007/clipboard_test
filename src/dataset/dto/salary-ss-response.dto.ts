export class SalarySsResponseDto {
  max_salary: number;
  mean_salary: number;
  min_salary: number;
}

export class SalarySsOnContractResponseDto extends SalarySsResponseDto {
  on_contract: boolean;
}
