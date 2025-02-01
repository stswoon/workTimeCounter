import Timer from "./Timer.tsx";
import {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {TimerModel, WorkTimeCounterData} from "../models/timer.model.ts";
import {Box, Button, Divider, Stack} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {randomColor} from "../helpers/uniqueTimerName.helper.ts";


const createTimer = (): TimerModel => {
    return {
        name: "Timer " + randomColor(),
        time: 0,
        id: uuidv4()
    }
}

const MAX_TIMERS = 5;

const TimerManager: FC = () => {
    const [timerModels, setTimerModels] = useState<TimerModel[]>([]);

    useEffect(() => {
        let workTimeCounterData: WorkTimeCounterData | undefined = undefined;
        try {
            const dataAsString = localStorage.getItem("workTimeCounterData");
            if (dataAsString) {
                workTimeCounterData = JSON.parse(dataAsString);
            }
        } catch (e) {
            console.error("Failed to load data from localStorage: ", e);
        }
        if (!workTimeCounterData) {
            workTimeCounterData = {timers: [createTimer()]};
        }
        setTimerModels(workTimeCounterData.timers);
    }, []);

    const saveToLocalStorage = useCallback((timerModels: TimerModel[]) => {
        const workTimeCounterData = {timers: timerModels};
        localStorage.setItem("workTimeCounterData", JSON.stringify(workTimeCounterData));
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
        const newTimerModels = [...timerModels, createTimer()];
        setTimerModels(newTimerModels);
        saveToLocalStorage(newTimerModels);
    }, [saveToLocalStorage, timerModels]);

    const displayAddButton: boolean = useMemo(() => {
        return timerModels.length < MAX_TIMERS;
    }, [timerModels.length])

    return (
        <Stack className="taTimerManager" spacing={4}
               divider={<Divider orientation="horizontal" flexItem/>}>
            {timerModels.map(({id, name, time}) => (
                <Timer key={id} id={id} name={name} time={time}
                       onNameChange={(name) => setTimerName(id, name)}
                       onTimeChange={(time) => setTimerTime(id, time)}
                       onRemove={() => removeTimer(id)}
                />
            ))}
            {displayAddButton &&
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button variant="outlined" onClick={() => addNewTimer()}>Add Timer</Button>
                </Box>}
        </Stack>
    )
};

export default memo(TimerManager);