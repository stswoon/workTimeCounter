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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/*<DialogTitle id="alert-dialog-title">*/}
                {/*    {"Use Google's location service?"}*/}
                {/*</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove timer {props.timerName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose(false)}>Cancel</Button>
                    <Button onClick={() => props.onClose(true)} autoFocus>Remove</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(TimerRemoveConfirmationDialog)