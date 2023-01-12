import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import classNames from 'classnames/bind';
import styles from './Clock.module.scss';
import { alpha, styled } from '@mui/material/styles';
// import { useStoreDate } from '~/store';
import { useEffect, useState } from 'react';

const SuccessStaticTimePicker = styled(StaticTimePicker)({
    '& .css-1hbyad5-MuiTypography-root': {
        fontSize: '1.6rem',
        textAlign: 'center',
        width: '100%',
    },
    '& .css-1r3tc0d-MuiTimePickerToolbar-hourMinuteLabel': {
        width: '100%',
        justifyContent: 'center'
    },
    '& .css-hlj6pa-MuiDialogActions-root': {
        display: 'none'
    },
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        fontSize: '1.6rem'
    }
})
function Clock({ getTime, order }) {
    const [value, setValue] = useState(dayjs());
    const addZero = (i) => {
        if (i < 10) {i = "0" + i}
        return i;
    }
    
    let h = addZero(value.$H);
    let m = addZero(value.$m);
    
    useEffect(() => {
        getTime(h, m, order)
    },[h, m])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SuccessStaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default Clock