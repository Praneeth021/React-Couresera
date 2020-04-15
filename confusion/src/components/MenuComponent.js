import React ,{Component} from 'react';
import {Card,CardText,CardBody,CardTitle,CardImgOverlay,CardImg} from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props){
        super(props)
    this.state={
        selectedDish:null,
    }
    
}
    onselectDish(dish) {
        this.setState({selectedDish:dish});
    }

    

    render() {
        
        const menu= this.props.dishes.map((dish)=>{
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card key={dish.id} onClick={()=>this.onselectDish(dish)}>
                        <CardImg width='100%' src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardText>
                                {dish.name}
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </div>
                    
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <DishDetail selDish={this.state.selectedDish}  />
            </div>
        )
    }
}

export default Menu;