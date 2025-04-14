import React, { useState } from 'react'
import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'

function DatePick( {sejel_date} ) {
    const [date, setDate] =useState();
    console.log("Date", date);
    return(
    <>
    <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
        تاريخ إصدار الشهادة
    </Label>
    <input className='form-control form-control-lg height-48 f-s-16px f-w-700' name='sejel_date' id='sejel_date' value={sejel_date} type="date" onChange={e=>setDate(e. target.value)} />
    </>
    )
    }
    export default DatePick