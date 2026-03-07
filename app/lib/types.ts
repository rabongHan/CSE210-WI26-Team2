export type GameInfo = {
    name: string;
    subtitle: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    unlocked: boolean;
    gradient: string;
    glow: string;
    iconBg: string;
    step: number;
};
