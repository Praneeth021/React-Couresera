import React,{Component} from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';




import {Switch,Redirect,Route,withRouter} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';

const  mapStateToProps = (state)=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions
    }
}


class Main extends Component {

    constructor(props)
    {
        super(props);

        

        
    }

    

    

    render() {


        const HomePage = (props) =>{
            return (
                <div>
                    <Home />
                </div>
            )
        }

        const DishWithId = ({match}) =>{
            
            return (
        
                <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
                            comments={this.props.comments.filter((comment)=>comment.id===parseInt(match.params.dishId))[0]}
                            />
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path ='/home' component={()=><Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]} promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]} /> }  />
                    <Route exact path = '/menu' component={()=><Menu dishes={this.props.dishes} />} />
                    <Route path= '/menu/:dishId' component={DishWithId} />
                    <Route path = '/contactus' component={Contact} />
                    <Route path= '/aboutus' component={()=><About leaders={this.props.leaders} />}/>
                    <Redirect path='/home' />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Main));