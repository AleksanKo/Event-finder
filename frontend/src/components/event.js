import React, {Component}from 'react';
import axios from 'axios'
import {Card, Navbar} from 'react-bootstrap'


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

const Event = props => (
    <Card style={{width:"400px", height:"420px", padding:"5px", margin:"10px"}}>
    {imageForCard(props.event)}
    <Card.Body>
    <Card.Title>
    {props.event.name.fi}
    </Card.Title>
    <Card.Subtitle>{getFormattedDate(props.event.event_dates.starting_day)}</Card.Subtitle>
        <Card.Text>{props.event.description.intro}</Card.Text>
        </Card.Body>
        </Card>
)

export default class EventsList extends Component {
    constructor(props){
        super(props)
        this.state = {events: []}
    }

    componentDidMount(){
        console.log('hello')
        axios.get('http://localhost:5001/')
        .then(res => {
            this.setState({events: res.data})
            console.log(this.state)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    eventList() {
        return this.state.events
        .map(currentevent => {
            return <Event event={currentevent} 
            key={currentevent.id}/>
        })
    }
    render(){
        return (
            <div>
                <Navbar className="bg-light expand-lg">
                <Navbar.Brand>Events Finder in Helsinki</Navbar.Brand>
                </Navbar>
                <div class='card-columns'>
                    {this.eventList()}
                    </div>
            </div>
        )
    }
}