import React, {useState, useEffect } from 'react';
import axios from 'axios'
import {Card, Navbar, Form, FormControl, Button} from 'react-bootstrap'

const getFormattedDate = (day) => {
    const date = new Date(day)
    const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return dateString
}

const imageForCard = (event) => {
    if (event.description.images.length != [] && event.description.images[0].url) {
        return <Card.Img variant='top' src={event.description.images[0].url} style={{height:"200px"}} alt="Card image"></Card.Img>
    }
}

const textDisplayed = (event) => {
    if (event.info_url != null && event.description.intro.length < 100) {
        return (
            <>
            <Card.Text>{event.description.intro}</Card.Text>
            <Card.Link href={event.info_url}>More information about the event</Card.Link>
            </>
        )
    } else {
        return <Card.Text>{event.description.intro}</Card.Text>
    }
}

const Events = props => (
    <Card className="shadow p-3 mb-5 bg-white rounded text-center"
          style={{width:"400px", height:"450px", padding:"5px", margin:"10px"}}>
    {imageForCard(props.event)}
    <Card.Body>
    <Card.Title>
    {props.event.name.fi}
    </Card.Title>
    <Card.Subtitle>{getFormattedDate(props.event.event_dates.starting_day)}</Card.Subtitle>
        {textDisplayed(props.event)}
        </Card.Body>
        </Card>
)

function EventsList(filter) {
    const [events, setEvents] = useState([])
    const [filterBy, setFilterBy] = useState('')

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value)
    }

    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:5001/')
            setEvents(res.data)
        }) ();
    },[])

    const eventList = () => {
        return events
            .filter(event => event.name.fi.toLowerCase().includes(filterBy.toLowerCase()))
            //.sort((a, b) => a.name.fi.localeCompare(b.name.fi))
            .map(currentevent => {
                return <Events event={currentevent}
                           key={currentevent.id}/>
        })
    }
        return (
            <div>
                <Navbar className="bg-light expand-lg">
                    <Navbar.Brand>Events Finder in Helsinki</Navbar.Brand>
                <Form inline className='justify-content-center mr-sm-2'>
                    <Form.Control
                        type="text"
                        onChange={handleFilterChange}
                        placeholder="Search by name"
                    ></Form.Control>
                </Form>
                </Navbar>
                <div className='card-columns'>

                    {eventList()}
                    </div>
            </div>
        )
    }


export default EventsList;