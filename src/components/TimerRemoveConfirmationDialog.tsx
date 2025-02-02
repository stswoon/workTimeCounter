import {FC, memo} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {strings} from "../constants/strings.ts";

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
                        {strings.removeDialog.text} <b>{props.timerName}</b>?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => props.onClose(false)}>
                        {strings.removeDialog.cancelButton}
                    </Button>
                    <Button color="error" onClick={() => props.onClose(true)}
                            autoFocus>{strings.removeDialog.okRemoveButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(TimerRemoveConfirmationDialog)