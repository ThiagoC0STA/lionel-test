import { useState } from 'react';
import { addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns';
import { USERS } from '../lib/constants';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return addDays(start, i);
  });

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate((current) =>
      direction === 'next' ? addWeeks(current, 1) : subWeeks(current, 1)
    );
  };

  return {
    currentWeek,
    navigateWeek,
    users: USERS,
  };
} 