import { createContext, useContext, useState, type ReactNode } from 'react';
import { isTwinId, twins, type TwinId } from './restaurants';

interface StudyChoice {
  id: TwinId;
  restaurant: string;
  selectedAt: string;
}

const storageKey = 'gather-atomix-study-choice-v1';

function loadChoice(): StudyChoice | null {
  try {
    const entry = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
    return isTwinId(entry?.id) ? entry : null;
  } catch {
    return null;
  }
}

const StudyChoiceContext = createContext<{
  choice: StudyChoice | null;
  select: (id: TwinId) => void;
  clear: () => void;
} | null>(null);

export function StudyChoiceProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState(loadChoice);

  function save(entry: StudyChoice | null) {
    setChoice(entry);
    try {
      if (entry) sessionStorage.setItem(storageKey, JSON.stringify(entry));
      else sessionStorage.removeItem(storageKey);
    } catch {
      // The current choice is still available in React state.
    }
  }

  return (
    <StudyChoiceContext.Provider value={{
      choice,
      select: (id) => save({ id, restaurant: twins[id].name, selectedAt: new Date().toISOString() }),
      clear: () => save(null),
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
