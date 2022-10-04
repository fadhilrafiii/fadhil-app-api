import { ActivityDifficultyValue } from './../../models/Activity';

import { ActivityPriorityValue, IActivity } from 'models/Activity';

import dayjs from 'helpers/datetime';

export const getTodayActivities = (activities: IActivity[]): IActivity[] => {
  return activities.filter(
    (activity: IActivity) =>
      dayjs(activity.schedule).isToday() || dayjs(activity.deadline).isToday(),
  );
};

export const getActivityFilterFromQuery = (
  query: Record<string, unknown>,
): Record<string, unknown> => {
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

// score = Urgency * 3 + Difficulty * 2 + (31 - diff today to deadline) *
export const getActivityScore = (activity: IActivity): number =>
  ActivityDifficultyValue[activity.difficulty] * 3 +
  ActivityPriorityValue[activity.priority] * 2 +
  (activity.deadline && dayjs().isBefore(activity.deadline)
    ? 31 - dayjs().diff(activity.deadline, 'day', true)
    : 0);

export const getRecommendedActivties = (activities: IActivity[]): IActivity[] =>
  activities
    .sort((a: IActivity, b: IActivity) => {
      const scoreA = getActivityScore(a);
      const scoreB = getActivityScore(b);

      return scoreB - scoreA;
    })
    .slice(0, 7);
