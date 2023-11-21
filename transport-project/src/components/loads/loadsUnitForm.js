import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  projectFirestore,
  projectStorage,
  projectAuthentication,
} from "../../firebase/config";


const LoadsUnitForm = ({

    existingLoad,
    onSave,
    onReset
}) => {
    const initialLoadState = {
        createdby: '',
        startDate: '',
        endDate: '',
        departure: '',
        destination: '',
        vehicle: '',
        status: ''
    }

    const [load, setLoad] = useState(initialLoadState)
    const [starDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    useEffect(() => {
        if(existingLoad){
            setLoad(existingLoad)
        }
    }, [existingLoad]);

    const resetForm = () => {
        setLoad(initialLoadState)
    }

    const handleChange = (eventOrCustomObject) => {
        
        const { name, value } = eventOrCustomObject.target || eventOrCustomObject
        setLoad({...load, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(load);
        resetForm()
    }

    const isEditing = Boolean(existingLoad)

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {isEditing && (
                <Typography variant="h6" color="primary" gutterBottom>
                Editando carga
              </Typography>
            )}
            <Grid constainer spacing={2}>
                
                <Grid item xs={12} sm={4}>
                <TextField
                required
                fullWidth
                name="createdby"
                label="Creado Por:"
                value={load.createdby}
                onChange={handleChange}
                />
                </Grid>

                

            </Grid>
        </Box>
    )


}



