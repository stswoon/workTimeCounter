import {Box, Button, Input, Typography} from "@mui/material";
import {FC, memo, useCallback, useMemo, useState} from "react";
import TimerRemoveConfirmationDialog from "./TimerRemoveConfirmationDialog.tsx";

interface TimerProps {
    id: string;
    name: string;
    time: number;
    onNameChange: (name: string) => void;
    onTimeChange: (deltaTime: number) => void;
    onRemove: () => void;
}

const Timer: FC<TimerProps> = (props) => {
    const displayTime = useMemo(() => {
        const time = props.time;

        let t = Math.abs(time);
        const d = Math.floor(t / (8 * 60));
        t = t - d * 8 * 60;
        const h = Math.floor(t / 60);
        t = t - h * 60;
        const m = t;

        let result = "";

        if (time === 0) {
            result += "";
        } else if (time > 0) {
            result += "+ ";
        } else {
            result += "- ";
        }

        if (d > 0) {
            result += d + "d ";
        }
        if (h > 0) {
            result += h + "h ";
        }
        if (m > 0) {
            result += m + "m";
        }
        if (d === 0 && h === 0 && m === 0) {
            result = "0m"
        }

        return result;
    }, [props.time]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = useCallback((agreed: boolean) => {
        setDialogOpen(false);
        if (agreed) {
            props.onRemove();
        }
    }, [props]);

    return (
        <Box className={'taTimer_' + props.id} sx={{display: 'flex'}}>
            <Input placeholder='Timer name' value={props.name}
                   onChange={(event) => props.onNameChange(event.target.value)}></Input>
            <Button variant="contained" onClick={() => props.onTimeChange(-60)}>-1h</Button>
            <Button variant="contained" onClick={() => props.onTimeChange(-15)}>-15m</Button>
            <Button variant="contained" onClick={() => props.onTimeChange(-5)}>-5m</Button>
            <Typography>{displayTime}</Typography>
            <Button variant="contained" onClick={() => props.onTimeChange(+5)}>+5m</Button>
            <Button variant="contained" onClick={() => props.onTimeChange(+15)}>+15m</Button>
            <Button variant="contained" onClick={() => props.onTimeChange(+60)}>+1h</Button>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>X</Button>
            <TimerRemoveConfirmationDialog open={dialogOpen} timerName={props.name} onClose={handleDialogClose}/>
        </Box>

    );
};

export default memo(Timer);