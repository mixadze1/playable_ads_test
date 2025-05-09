import { _decorator, Color, Component, Node } from 'cc';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('StorageService')
export class StorageService  {
    public save(key: string, value: any): void {
        try {
            const jsonString = JSON.stringify(value);
            localStorage.setItem(key, jsonString);
            Logger.Log(`[LocalStorage] Data saved: ${key} = ${jsonString}`);
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
    }

    public load<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (data) {
            Logger.Log(`[LocalStorage] Load json with key: ${key}, ${Color.GREEN}`);
            return JSON.parse(data) as T; 
        }
        return null;
    }
}


