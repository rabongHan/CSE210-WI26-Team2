/**
 * Health bar component for displaying player and boss health
 */

import { getHealthPercentage } from '../lib/gameLogic';

interface HealthBarProps {
  label: string;
  current: number;
  max: number;
}

export default function HealthBar({ 
  label, 
  current, 
  max
}: HealthBarProps) {
  const percentage = getHealthPercentage(current, max);
  
  return (
    <div className="w-[300px]">
      <p className="mb-[0.5vh] font-bold text-center">
        {label}: <span id={label === "Boss Health" ? "bossHealthText" : "userHealthText"}>{current}/{max}</span>
      </p>
      <div className="w-full h-[30px] bg-gray-300 border-2 border-black rounded-lg overflow-hidden">
        <div 
          id={label === "Boss Health" ? "bossHealthBar" : "userHealthBar"}
          className="h-full bg-red-500 transition-[width] duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
