import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default class Calendar extends React.Component {
    state = {
        isModalOpen: false,
        title: "",
        description: "",
        start: "",
        uid: "",
        end: "",
        isEditable: true
    }
    render() {
        return (
            <div className='demo-app'>
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev, next',
                            center: 'title',
                            right: "dayGridMonth"
                        }}
                        initialView='dayGridMonth'
                        events={this.props.currentEvents}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    />
                </div>
            </div>
        )
    }
    /*
    Meet edit by default is true 
    */
    // handleEventClick = (clickInfo) => {
    //     axios.get(`http://localhost:8000/api/meeting/${clickInfo.event.title}`).then(user => {
    //         if (user.data.senderUid !== JSON.parse(localStorage.getItem("userDetails")).uid)
    //             this.setState({ isEditable: false }) 
    //         this.setState({ title: user.data.title, description: user.data.description, start: user.data.start, end: user.data.end, uid: user.data.uid })
    //         this.setState({ isModalOpen: true })
    //     }).catch(err => {
    //         console.log(err.message);
    //     })
    // }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <div>
            <b>EXPENSE: {eventInfo.event.title.split(",")[0]}</b><br />
            <i>REVENUE: {eventInfo.event.title.split(",")[1]}</i>
        </div>
    )
}