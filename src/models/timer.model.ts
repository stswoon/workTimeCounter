export interface WorkTimeCounterData {
    timers: TimerModel[];
}

export interface TimerModel {
    id: string;
    name: string;
    time: number;
}