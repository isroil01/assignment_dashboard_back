import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getAll() {
    try {
      return await this.companyService.findAll();
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const company = await this.companyService.findById(id);
      if (!company)
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      return company;
    } catch (err: any) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
