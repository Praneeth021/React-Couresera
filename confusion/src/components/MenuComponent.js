import React  from 'react';
import {Card,CardText,CardImgOverlay,CardImg} from 'reactstrap';



function RenderMenuItem({dish}){
    if(dish!=null){
        return (
            <Card key={dish.id}>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardText>
                        {dish.name}
                    </CardText>
                </CardImgOverlay>
            </Card>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}



    

    const Menu = (props) => {
        
        const menu= props.dishes.map((dish)=>{
            return (
                <div className='col-12 col-md-5 m-1' key={dish.id}>
                   <RenderMenuItem dish={dish} onClick={props.onClick} />
                </div>
                    
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
            </div>
        )
    }


export default Menu;