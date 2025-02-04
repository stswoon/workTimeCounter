import { WorkTimeCounterDataModel } from "../models/timer.model.ts";

const WORK_TIMER_COUNTER_STORAGE_KEY = "workTimeCounterData";

export const getWorkTimeCounterData = ():
  | WorkTimeCounterDataModel
  | undefined => {
  let workTimeCounterData: WorkTimeCounterDataModel | undefined = undefined;
  try {
    const dataAsString = localStorage.getItem(WORK_TIMER_COUNTER_STORAGE_KEY);
    if (dataAsString) {
      workTimeCounterData = JSON.parse(dataAsString);
    }
    return workTimeCounterData;
  } catch (e) {
    console.error("Failed to load data from localStorage: ", e);
  }
  return undefined;
};

export const saveWorkTimeCounterData = (
  data: WorkTimeCounterDataModel,
): void => {
  localStorage.setItem(WORK_TIMER_COUNTER_STORAGE_KEY, JSON.stringify(data));
};
