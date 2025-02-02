import {Box, Button, Stack, Typography, TextField} from "@mui/material";
import {FC, memo, useCallback, useMemo, useState} from "react";
import TimerRemoveConfirmationDialog from "./TimerRemoveConfirmationDialog.tsx";
import {formatTime} from "../helpers/formatTime.helper.ts";

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
        return formatTime(props.time);
    }, [props.time]);

    const displayTimeColor = useMemo(() => {
        if (props.time > 0) {
            return "success"
        } else if (props.time < 0) {
            return "error"
        } else {
            return "textPrimary"
        }
    }, [props.time])

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = useCallback((agreed: boolean) => {
        setDialogOpen(false);
        if (agreed) {
            props.onRemove();
        }
    }, [props]);

    return (
        <Stack spacing={2}>
            <Stack direction='row' spacing={1} sx={{justifyContent: "space-between"}}>
                <TextField size='small' variant="outlined" placeholder='Timer name' value={props.name}
                           sx={{width: '100px'}}
                           onChange={(event) => props.onNameChange(event.target.value)}/>

                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant={"h5"} color={displayTimeColor} noWrap>{displayTime}</Typography>
                </Box>

                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Button variant="outlined" color="error" onClick={() => setDialogOpen(true)}>X</Button>
                </Box>
            </Stack>

            <Stack direction='row' spacing={2}>
                <Button variant="contained" onClick={() => props.onTimeChange(-60)}>-1h</Button>
                <Button variant="contained" onClick={() => props.onTimeChange(-15)}>-15'</Button>
                <Button variant="contained" onClick={() => props.onTimeChange(-5)}>-5'</Button>
            </Stack>

            <Stack direction='row' spacing={2} sx={{justifyContent: "right"}}>
                <Button variant="contained" onClick={() => props.onTimeChange(+5)}>+5'</Button>
                <Button variant="contained" onClick={() => props.onTimeChange(+15)}>+15'</Button>
                <Button variant="contained" onClick={() => props.onTimeChange(+60)}>+1h</Button>
            </Stack>

            <TimerRemoveConfirmationDialog open={dialogOpen} timerName={props.name} onClose={handleDialogClose}/>
        </Stack>

    );
};

export default memo(Timer);