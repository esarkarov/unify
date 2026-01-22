import { Request, Response } from 'express';

import { statsService } from '@/features/stats/stats.service';
import { logger } from '@/shared/logger';
import { asyncHandler } from '@/shared/middlewares/error.middleware';

class StatsController {
  getCharts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching chart stats');

    const result = await statsService.getCharts();

    logger.info('Chart stats fetched successfully');

    res.status(200).json({ data: result });
  });

  getLatest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching latest activity stats', { query: req.query });

    const result = await statsService.getLatest(req.query);

    logger.info('Latest activity stats fetched successfully');

    res.status(200).json({ data: result });
  });

  getOverview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching overview stats');

    const result = await statsService.getOverview();

    logger.info('Overview stats fetched successfully');

    res.status(200).json({ data: result });
  });
}

export const statsController = new StatsController();
