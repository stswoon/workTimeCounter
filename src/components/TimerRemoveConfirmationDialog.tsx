import {FC, memo} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

interface TimerRemoveConfirmationDialogProps {
    open: boolean;
    timerName: string;
    onClose: (agreed: boolean) => void;
}

const TimerRemoveConfirmationDialog: FC<TimerRemoveConfirmationDialogProps> = (props) => {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.onClose(false)}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove timer <b>{props.timerName}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose(false)}>Cancel</Button>
                    <Button color="error" onClick={() => props.onClose(true)} autoFocus>Remove</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(TimerRemoveConfirmationDialog)