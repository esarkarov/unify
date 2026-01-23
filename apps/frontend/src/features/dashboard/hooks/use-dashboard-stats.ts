import { ChartsStats, LatestStats, OverviewStats } from '@/features/dashboard/types';
import { BACKEND_API_URL } from '@/shared/constants';
import { useCustom } from '@refinedev/core';

export function useDashboardStats() {
  const {
    query: { data: overviewData, isLoading: overviewLoading, isError: overviewError },
  } = useCustom<OverviewStats>({
    url: `${BACKEND_API_URL}stats/overview`,
    method: 'get',
  });

  const {
    query: { data: latestData, isLoading: latestLoading, isError: latestError },
  } = useCustom<LatestStats>({
    url: `${BACKEND_API_URL}stats/latest`,
    method: 'get',
    config: {
      query: {
        limit: 5,
      },
    },
  });

  const {
    query: { data: chartsData, isLoading: chartsLoading, isError: chartsError },
  } = useCustom<ChartsStats>({
    url: `${BACKEND_API_URL}stats/charts`,
    method: 'get',
  });

  const isLoading = overviewLoading || latestLoading || chartsLoading;
  const isError = overviewError || latestError || chartsError;

  return {
    overview: overviewData?.data ?? {
      admins: 0,
      classes: 0,
      departments: 0,
      subjects: 0,
      teachers: 0,
      users: 0,
    },
    latest: latestData?.data ?? {
      latestClasses: [],
      latestTeachers: [],
    },
    charts: chartsData?.data ?? {
      classesBySubject: [],
      subjectsByDepartment: [],
      usersByRole: [],
    },
    isLoading,
    isError,
  };
}
