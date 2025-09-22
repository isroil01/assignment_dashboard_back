import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReportService, Report } from './report.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllReports(): Promise<Report[]> {
    return await this.reportService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getReport(@Param('id') id: string): Promise<Report> {
    return await this.reportService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReport(@Body() report: Omit<Report, 'id'>): Promise<Report> {
    return await this.reportService.create(report);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateReport(
    @Param('id') id: string,
    @Body() updatedReport: Partial<Omit<Report, 'id'>>,
  ): Promise<Report> {
    return await this.reportService.update(id, updatedReport);
  }
}
