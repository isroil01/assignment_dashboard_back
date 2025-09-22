import { Injectable } from '@nestjs/common';
import { delayHelper, jitterHelper, maybeFailHelper } from 'utils/delay';

export interface Emission {
  yearMonth: string;
  emissions: number;
}

export interface Company {
  id: string;
  name: string;
  country: string;
  totalEmissions: number;
  avgMonthly: number;
  emissions: Emission[];
  latestReport: string;
}

@Injectable()
export class CompanyService {
  private companies: Company[] = [
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

  async findAll(): Promise<Company[]> {
    await delayHelper(jitterHelper());
    if (maybeFailHelper()) throw new Error('Failed to fetch companies');
    return this.companies;
  }

  async findById(id: string): Promise<Company | undefined> {
    await delayHelper(jitterHelper());
    if (maybeFailHelper()) throw new Error('Failed to fetch company');
    return this.companies.find((c) => c.id === id);
  }
}
