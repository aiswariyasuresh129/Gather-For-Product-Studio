import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { isTwinId, twins, type MealId, type TwinId } from './restaurants';

interface StudyChoice {
  id: TwinId;
  restaurant: string;
  selectedAt: string;
}

type StudyChoices = Partial<Record<MealId, StudyChoice>>;
const storageKey = 'gather-rule-of-thirds-study-choices-v1';

function loadChoices(): StudyChoices {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
    const choices: StudyChoices = {};
    for (const meal of ['brunch', 'dinner'] as const) {
      const entry = saved?.[meal];
      const id: unknown = entry?.id;
      if (isTwinId(id) && twins[id].meal === meal && typeof entry.selectedAt === 'string') {
        choices[meal] = entry;
      }
    }
    return choices;
  } catch {
    return {};
  }
}

const StudyChoiceContext = createContext<{
  choices: StudyChoices;
  select: (id: TwinId) => void;
  clear: (meal: MealId) => void;
} | null>(null);

export function StudyChoiceProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState(loadChoices);

  function save(meal: MealId, entry?: StudyChoice) {
    setChoices((previous) => {
      const next = { ...previous };
      if (entry) next[meal] = entry;
      else delete next[meal];
      return next;
    });
  }

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(choices));
    } catch {
      // The current choice is still available in React state.
    }
  }, [choices]);

  return (
    <StudyChoiceContext.Provider value={{
      choices,
      select: (id) => save(twins[id].meal, { id, restaurant: twins[id].name, selectedAt: new Date().toISOString() }),
      clear: (meal) => save(meal),
    }}>
      {children}
    </StudyChoiceContext.Provider>
  );
}

export function useStudyChoice() {
  const context = useContext(StudyChoiceContext);
  if (!context) throw new Error('StudyChoiceProvider is required.');
  return context;
}
