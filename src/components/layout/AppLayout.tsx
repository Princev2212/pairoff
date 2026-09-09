import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';
import { FoodScannerModal } from '../food-scanner/FoodScannerModal';
import { AddFoodModal } from '../nutrition/AddFoodModal';
import { LogWeightModal } from '../weight/LogWeightModal';
import { OnboardingModal } from '../onboarding/OnboardingModal';

interface AppLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  children,
}) => {
  const {
    profile,
    isScannerOpen,
    closeScanner,
    isAddFoodOpen,
    closeAddFood,
    isLogWeightOpen,
    closeLogWeight,
    openScanner,
  } = useApp();

  return (
    <div className="relative min-h-screen bg-[#070A0F] text-[#F1F5F9] overflow-x-hidden flex">
      {/* Dynamic Aurora Ambient Background Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Emerald Blob Top-Left */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] animate-aurora-slow" />

        {/* Cyan Blob Top-Right */}
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] animate-aurora-reverse" />

        {/* Indigo / Blue Blob Mid-Bottom */}
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[500px] bg-indigo-500/8 rounded-full blur-[150px] animate-aurora-slow" />

        {/* Subtle Violet Blob Bottom-Right */}
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-violet-600/6 rounded-full blur-[140px]" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={onSelectTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 min-h-screen pb-24 lg:pb-8">
        <Header onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        onOpenScan={() => openScanner()}
      />

      {/* Global Modals */}
      <FoodScannerModal isOpen={isScannerOpen} onClose={closeScanner} />
      <AddFoodModal isOpen={isAddFoodOpen} onClose={closeAddFood} />
      <LogWeightModal isOpen={isLogWeightOpen} onClose={closeLogWeight} />

      {/* Mandatory Multi-step Onboarding Modal for first-time visitors */}
      {!profile?.isOnboarded && <OnboardingModal />}
    </div>
  );
};
