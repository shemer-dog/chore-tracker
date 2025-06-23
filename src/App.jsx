import { LanguageProvider } from './contexts/LanguageContext';
import ChoreTracker from './components/ChoreTracker/ChoreTracker';

function App() {
  return (
    <LanguageProvider>
      <ChoreTracker />
    </LanguageProvider>
  );
}

export default App;