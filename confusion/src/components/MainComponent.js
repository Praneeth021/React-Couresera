import React,{Component} from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes.js';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';



import {Switch,Redirect,Route} from 'react-router-dom';


class Main extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            dishes:DISHES,
            leaders:LEADERS,
            promotions:PROMOTIONS,
            comments:COMMENTS,
        }
    }

    

    render() {


        const HomePage = (props) =>{
            return (
                <div>
                    <Home />
                </div>
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path ='/home' component={()=><Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]} promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]} /> }  />
                    <Route exact path = '/menu' component={()=><Menu dishes={this.state.dishes} />} />
                    <Route path = '/contactus' component={Contact} />
                    <Redirect path='/home' />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main;