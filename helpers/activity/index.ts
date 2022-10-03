import { IActivity } from 'models/Activity';

import dayjs from 'helpers/datetime';

export const getTodayActivities = (activities: IActivity[]): IActivity[] => {
  return activities.filter(
    (activity: IActivity) =>
      dayjs(activity.schedule).isToday() || dayjs(activity.deadline).isToday(),
  );
};

export const getTaskFilterFromQuery = (query: Record<string, unknown>): Record<string, unknown> => {
  let filter: Record<string, unknown> = {};

  const startOfToday = dayjs().startOf('day');
  const endOfToday = dayjs().endOf('day');

  switch (query.type) {
    case 'Today':
      filter = {
        ...filter,
        $or: [
          { schedule: { $gte: startOfToday, $lt: endOfToday } },
          { deadline: { $gte: startOfToday, $lt: endOfToday } },
        ],
      };
      break;
    case 'Habits':
      filter = {
        ...filter,
        isHabit: true,
      };
      break;
  }

  return filter;
};
