import Timer from "./Timer.tsx";
import {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {TimerModel} from "../models/timer.model.ts";
import {Box, Button, Divider, Stack} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {getWorkTimeCounterData, saveWorkTimeCounterData} from "../helpers/localStorage.helper.ts";
import {strings} from "../constants/strings.ts";


const createTimer = (index: number): TimerModel => {
    return {
        name: strings.defaultTimerName + " " + index,
        time: 0,
        id: uuidv4()
    }
}

const MAX_TIMERS = 3;

const TimerManager: FC = () => {
    const [timerModels, setTimerModels] = useState<TimerModel[]>([]);

    useEffect(() => {
        let workTimeCounterData = getWorkTimeCounterData();
        if (!workTimeCounterData) {
            workTimeCounterData = {timers: [createTimer(1)]};
        }
        setTimerModels(workTimeCounterData.timers);
        saveWorkTimeCounterData(workTimeCounterData);
    }, []);

    const saveToLocalStorage = useCallback((timerModels: TimerModel[]) => {
        const workTimeCounterData = {timers: timerModels};
        saveWorkTimeCounterData(workTimeCounterData);
    }, []);

    const setTimerName = useCallback((id: string, name: string) => {
        const newTimerModels = timerModels.map(timerModel => {
            if (timerModel.id === id) {
                return {...timerModel, name}
            } else {
                return timerModel;
            }
        });
        setTimerModels(newTimerModels);
        saveToLocalStorage(newTimerModels);
    }, [saveToLocalStorage, timerModels]);

    const setTimerTime = useCallback((id: string, time: number) => {
        const newTimerModels = timerModels.map(timerModel => {
            if (timerModel.id === id) {
                return {...timerModel, time: timerModel.time + time}
            } else {
                return timerModel;
            }
        });
        setTimerModels(newTimerModels);
        saveToLocalStorage(newTimerModels);
    }, [saveToLocalStorage, timerModels]);

    const removeTimer = useCallback((id: string) => {
        const newTimerModels = timerModels.filter(timerModel => timerModel.id !== id);
        setTimerModels(newTimerModels);
        saveToLocalStorage(newTimerModels);
    }, [saveToLocalStorage, timerModels]);

    const addNewTimer = useCallback(() => {
        const newTimerModels = [...timerModels, createTimer(timerModels.length + 1)];
        setTimerModels(newTimerModels);
        saveToLocalStorage(newTimerModels);
    }, [saveToLocalStorage, timerModels]);

    const displayAddButton: boolean = useMemo(() => {
        return timerModels.length < MAX_TIMERS;
    }, [timerModels.length])

    return (
        <Stack spacing={4} divider={<Divider orientation="horizontal" flexItem/>} width="352px">
            {timerModels.map(({id, name, time}) => (
                <Timer key={id}
                       id={id} name={name} time={time}
                       onNameChange={(name) => setTimerName(id, name)}
                       onTimeChange={(time) => setTimerTime(id, time)}
                       onRemove={() => removeTimer(id)}
                />
            ))}
            {displayAddButton &&
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button variant="outlined" onClick={() => addNewTimer()}>{strings.addTimer}</Button>
                </Box>
            }
        </Stack>
    )
};

export default memo(TimerManager);