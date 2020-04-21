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
import {postComment,addComment,fetchDishes,fetchComments,fetchPromos} from '../redux/ActionCreators';

import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';




const  mapStateToProps = (state)=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        leaders:state.leaders,
        promotions:state.promotions,
    }
}

const mapStateToDispatch=(dispatch)=>({
    addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)),
    fetchDishes:()=>{dispatch(fetchDishes())},
    resetFeedbackform:()=>{dispatch(actions.reset('feedback'))},
    fetchComments:()=>{dispatch(fetchComments())},
    fetchPromos:()=>{dispatch(fetchPromos())},
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});



class Main extends Component {

    componentDidMount(){

        console.log('component mounted');
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }
    
    render() {

        
        const DishWithId = ({match}) =>{
            
            return (
        
                <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
                            comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
                            addComment={this.props.addComment}
                            commentsErrMess={this.props.comments.errMess}
                            postComment={this.props.postComment}
                            />
            )
        }
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition classNames='page' key={this.props.location.key} timeout={300}>
                        <Switch>
                            <Route path ='/home' component={()=><Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                            dishesLoading={this.props.dishes.isLoading} 
                            dishesErrMess={this.props.dishes.errmess}
                            promosLoading={this.props.promotions.isLoading}
                            promosErrMess={this.props.promotions.errmess}
                            leader={this.props.leaders.filter((leader) => leader.featured)[0]} /> }  />
                            <Route exact path = '/menu' component={()=><Menu dishes={this.props.dishes.dishes} 
                            isLoading={this.props.dishes.isLoading}
                            errMess={this.props.dishes.errMess}/>} />
                            <Route path= '/menu/:dishId' component={DishWithId} />
                            <Route path = '/contactus' component={()=><Contact resetFeedbackform={this.props.resetFeedbackform} />} />
                            <Route path= '/aboutus' component={()=><About leaders={this.props.leaders} />}/>
                            <Redirect path='/home'/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapStateToDispatch)(Main));