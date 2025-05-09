import { Color } from 'cc';

export class Logger 
 {
    public static Log(message: string, color: Color = Color.WHITE): void 
    {
        const rgbColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        console.log(`%c${message}`, `color: ${rgbColor}; font-weight: bold;`);
    }
}