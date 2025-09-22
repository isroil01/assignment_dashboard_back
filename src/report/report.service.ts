import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { delayHelper, jitterHelper, maybeFailHelper } from 'utils/delay';

export interface Report {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
}

@Injectable()
export class ReportService {
  private reports: Report[] = [
    {
      id: 'p1',
      title: 'Q1 Sustainability Update',
      resourceUid: 'Acme Corp',
      dateTime: '2024-03',
      content: 'Acme Corp reduced emissions by 15% in Q1 compared to Q4 2023.',
    },
    {
      id: 'p2',
      title: 'Q1 Emissions Report',
      resourceUid: 'Globex',
      dateTime: '2024-03',
      content:
        'Globex saw a 10% increase in CO₂ emissions due to higher production volumes.',
    },
    {
      id: 'p3',
      title: 'Quarterly CO2 Summary',
      resourceUid: 'Initech',
      dateTime: '2024-03',
      content:
        'Initech maintained stable emissions, focusing on renewable energy initiatives.',
    },
    {
      id: 'p4',
      title: 'Q2 Forecast',
      resourceUid: 'Acme Corp',
      dateTime: '2024-06',
      content:
        'Projected emissions expected to drop by 5% next quarter with new energy policy.',
    },
  ];

  async findAll(): Promise<Report[]> {
    await delayHelper(jitterHelper());
    if (maybeFailHelper())
      throw new InternalServerErrorException('Failed to load reports');
    return this.reports;
  }

  async findById(id: string): Promise<Report> {
    await delayHelper(jitterHelper());
    const report = this.reports.find((r) => r.id === id);
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async create(report: Omit<Report, 'id'>): Promise<Report> {
    await delayHelper(jitterHelper());
    if (maybeFailHelper())
      throw new InternalServerErrorException('Failed to create report');
    const newReport: Report = { id: Date.now().toString(), ...report };
    this.reports.push(newReport);
    return newReport;
  }

  async update(
    id: string,
    updatedReport: Partial<Omit<Report, 'id'>>,
  ): Promise<Report> {
    await delayHelper(jitterHelper());
    const reportIndex = this.reports.findIndex((r) => r.id === id);
    if (reportIndex === -1) throw new NotFoundException('Report not found');
    if (maybeFailHelper())
      throw new InternalServerErrorException('Failed to update report');
    const existing = this.reports[reportIndex];
    this.reports[reportIndex] = { ...existing, ...updatedReport };
    return this.reports[reportIndex];
  }
}
