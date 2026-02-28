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
    <div style={{ width: "300px" }}>
      <p style={{ marginBottom: "0.5vh", fontWeight: "bold", textAlign: "center" }}>
        {label}: <span id={label === "Boss Health" ? "bossHealthText" : "userHealthText"}>{current}/{max}</span>
      </p>
      <div style={{ width: "100%", height: "30px", backgroundColor: "#ddd", border: "2px solid #000", borderRadius: "8px", overflow: "hidden" }}>
        <div 
          id={label === "Boss Health" ? "bossHealthBar" : "userHealthBar"}
          style={{ height: "100%", width: `${percentage}%`, backgroundColor: "red", transition: "width 0.3s ease" }}
        />
      </div>
    </div>
  );
}
