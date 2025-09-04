import { Rocket, Telescope, Satellite } from "lucide-react";
import './WaveLoader.css';

export function MyWaveLoader() {
    return (
        <div className="flex flex-col items-center gap-2 justify-center min-h-full">
            <div className="flex gap-6">
                <Rocket strokeWidth={1.5} className="wave-item wave-item-1"/>
                <Telescope strokeWidth={1.5} className="wave-item wave-item-2"/>
                <Satellite strokeWidth={1.5} className="wave-item wave-item-3"/>
            </div>
        </div>
    );
}