import { Injectable } from '@nestjs/common';
import { delayHelper, jitterHelper, maybeFailHelper } from 'utils/delay';

@Injectable()
export class DashboardService {
  private companies = [
    {
      id: 'c1',
      name: 'Acme Corp',
      country: 'US',
      totalEmissions: 455,
      avgMonthly: 91,
      emissions: [
        { yearMonth: '2024-01', emissions: 120 },
        { yearMonth: '2024-02', emissions: 110 },
        { yearMonth: '2024-03', emissions: 95 },
        { yearMonth: '2024-04', emissions: 130 },
        { yearMonth: '2024-05', emissions: 105 },
      ],
      latestReport: 'Q1 Sustainability Update',
    },
    {
      id: 'c2',
      name: 'Globex',
      country: 'DE',
      totalEmissions: 420,
      avgMonthly: 84,
      emissions: [
        { yearMonth: '2024-01', emissions: 80 },
        { yearMonth: '2024-02', emissions: 105 },
        { yearMonth: '2024-03', emissions: 120 },
        { yearMonth: '2024-04', emissions: 90 },
        { yearMonth: '2024-05', emissions: 115 },
      ],
      latestReport: 'Sustainability Q1 Report',
    },
    {
      id: 'c3',
      name: 'Initech',
      country: 'FR',
      totalEmissions: 350,
      avgMonthly: 70,
      emissions: [
        { yearMonth: '2024-01', emissions: 60 },
        { yearMonth: '2024-02', emissions: 70 },
        { yearMonth: '2024-03', emissions: 65 },
        { yearMonth: '2024-04', emissions: 80 },
        { yearMonth: '2024-05', emissions: 75 },
      ],
      latestReport: 'Q1 Emissions Overview',
    },
  ];

  private overviewStats = {
    totalCountry: '3',
    totalCompany: '3',
    highestEmit: 'Acme Corp',
    topEmit: 'Industrial',
  };

  async getCompanies() {
    await delayHelper(jitterHelper());
    if (maybeFailHelper()) throw new Error('Failed to fetch companies');
    return this.companies;
  }

  async getOverviewStats() {
    await delayHelper(jitterHelper());
    if (maybeFailHelper()) throw new Error('Failed to fetch overview stats');
    return this.overviewStats;
  }
}
