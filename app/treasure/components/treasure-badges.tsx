export function GameBadges({ label, input }: { label: string, input:number }) {
    return (
        <div className="primary-box">
            <div className="font-bold">{label}: {input}</div>
        </div>
    )
}