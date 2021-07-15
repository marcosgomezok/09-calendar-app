import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment'
import { Navbar } from './../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

/* const events = [{
    title: 'Cumple de marcos',
    start: moment().toDate(), //new date
    end: moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar la torta',
    user:{
        _id:'123',
        name: 'Marcos'
    }
}] */

export const CalendarScreen = () => {

    const dispatch = useDispatch()
    //TODO leer del store los eventos
    const {events,activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')

    useEffect(() => {
        
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClick = (e) => {
        //console.log('abrir modal');
        dispatch(uiOpenModal())

    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
       // dispatch(uiOpenModal())
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e)
    }

    const onSelectSlot = (e) =>{
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event,start,end,isSelected) =>{

       // console.log(event)
        const style = {
            backgroundColor: (uid===event.user._id)?'#367CF7':'#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return{
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter = {eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

                <AddNewFab/>
                {
                    (activeEvent) && <DeleteEventFab/>
                }


            <CalendarModal/>
        </div>
    )
}
