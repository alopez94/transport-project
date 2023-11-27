import { useState } from 'react'

//styles
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

export default function Modal({dataObject}) {

//states
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

    return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div>
                <Container container rowSpacing={5} columnSpacing={{ xs: 1, sm: 4 }}>
                    <Grid item xs={12}>
                        

                    </Grid>
                </Container>
            </div>

        </Modal>
    </div>
  )
}
