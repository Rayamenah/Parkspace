import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator'
// this is a base query dto that can be extended by other query dtos
export class BaseQueryDto {
  @IsNumberString()
  @IsOptional()
  skip?: number

  @IsNumberString()
  @IsOptional()
  take?: number

  @IsString()
  @IsOptional()
  search?: string

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc'
}
