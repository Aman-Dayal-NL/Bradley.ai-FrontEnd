import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Interfaces matching the actual API Response Structure ---
export interface EmissionDataPoint {
    Year: number | string;
    Month: number | string;
    TOTALS: number;
    emissions: number;
}

export interface CurrentYearSummary {
    ytd_emissions: number;
    total_energy_consumption: number;
    current_month: string;
    difference_from_last_month: number;
    emission_reduction_goal: number;
    up_down_percentage: number;
    up_or_down: string;
}

export interface TargetGoals {
    "Baseline CO2 (Metric Tons)": { YTD: number | null; Forecast: number | null; "Previous Year": number | null; };
    "Reduction Amount": { YTD: number | null; Forecast: number | null; "Previous Year": number | null; };
    "Reduction %": { county: number | null; state: number | null; corp: number | null; };
    "Target (ON/OFF)": { county: boolean | null; state: boolean | null; corp: boolean | null; };
    "Action Needed": { county: boolean | null; state: boolean | null; corp: boolean | null; };
    "Penalty": { county: number | null; state: number | null; corp: number | null; };
}

export interface Penalty {
    location: { county: string; state: string; corp: string; };
    penalty_rule: { county: string; state: string; corp: string; };
}

export interface LocationData {
    location: string;
    source: "electric" | "gas";
    emissions: EmissionDataPoint[];
    current_year_summary: CurrentYearSummary;
    target_goals?: TargetGoals;
    penalty?: Penalty;
}

export type DashboardData = LocationData[];

// --- Context Definition & Provider ---
interface DashboardDataContextType {
    dashboardData: DashboardData | null;
    setDashboardData: (data: DashboardData | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    return (
        <DashboardDataContext.Provider value={{ dashboardData, setDashboardData, isLoading, setIsLoading }}>
            {children}
        </DashboardDataContext.Provider>
    );
};

// --- Custom Hook ---
export const useDashboardData = (): DashboardDataContextType => {
    const context = useContext(DashboardDataContext);
    if (context === undefined) {
        throw new Error('useDashboardData must be used within a DashboardDataProvider');
    }
    return context;
};