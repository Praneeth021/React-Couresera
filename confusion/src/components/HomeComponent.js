import React from 'react';
import {Card,CardSubtitle,CardImg,CardText,CardBody,CardTitle} from 'reactstrap';



function RenderCardItem ({item}) {

    return(
        <div>
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </div>

    )
}

const  Home = (props) => {

    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.dish} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.promotion} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCardItem item={props.leader} />
                </div>
            </div>
        </div>
    )
}

export default Home;
