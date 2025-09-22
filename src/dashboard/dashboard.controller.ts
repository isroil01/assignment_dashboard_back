import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  async getCompanies() {
    try {
      const companies = await this.dashboardService.getCompanies();
      return companies;
    } catch (err: any) {
      console.error(err);
      throw new HttpException(
        'Failed to load companies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('overview')
  async getOverviewStats() {
    try {
      const stats = await this.dashboardService.getOverviewStats();
      return stats;
    } catch (err: any) {
      console.error(err);
      throw new HttpException(
        'Failed to load overview stats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
