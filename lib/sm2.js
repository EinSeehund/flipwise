// currentDay is only passed for testing purposes and will not be merged into main

export function calculateNextReview(card, quality, currentDay = new Date()) {
  let { interval, repetitions, easeFactor } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const dueDate = new Date(currentDay);
  dueDate.setDate(dueDate.getDate() + interval);

  return { interval, repetitions, easeFactor, dueDate };
}
