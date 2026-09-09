import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { NutritionPage } from './pages/NutritionPage';
import { FoodScanPage } from './pages/FoodScanPage';
import { ProgressPage } from './pages/ProgressPage';
import { AICoachPage } from './pages/AICoachPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage onNavigateTab={setCurrentTab} />;
      case 'nutrition':
        return <NutritionPage />;
      case 'scan':
        return <FoodScanPage />;
      case 'progress':
        return <ProgressPage />;
      case 'coach':
        return <AICoachPage onNavigateTab={setCurrentTab} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage onNavigateTab={setCurrentTab} />;
    }
  };

  return (
    <AppProvider>
      <AppLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
        {renderCurrentPage()}
      </AppLayout>
    </AppProvider>
  );
}

export default App;
