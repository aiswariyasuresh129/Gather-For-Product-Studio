import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { App } from './App';
import { StudyChoiceProvider } from './study-choice';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <StudyChoiceProvider>
      <App />
    </StudyChoiceProvider>
  </HashRouter>,
);
