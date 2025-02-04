export interface WorkTimeCounterDataModel {
  timers: TimerModel[];
}

export interface TimerModel {
  id: string;
  name: string;
  time: number;
}
