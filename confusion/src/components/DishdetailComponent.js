import React,{Component} from 'react';
import {Card,CardText,CardBody,CardTitle,CardImg,Breadcrumb,BreadcrumbItem, Button,Row,Modal,ModalBody,ModalHeader, Label, Col,ReactFragment} from 'reactstrap';
import {Link,} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl} from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            Username :'',
            Rating:'',
            Comment:'',
            isModalOpen : false,
        }

        this.toggleModalOpen=this.toggleModalOpen.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModalOpen(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }

    handleSubmit(values){
        this.toggleModalOpen();
        this.props.postComment(this.props.dishId,values.Rating,values.Username,values.Comment);
        this.props.addComment(this.props.dishId,values.Rating,values.Username,values.Comment);

    }
    render(){
        return(
            <React.Fragment>
            <div className='container'>
                <Row className='form-group'>
                    <Button outline color='primary' onClick={this.toggleModalOpen}><span className='fa fa-pencil'> Submit Comment</span></Button>
                </Row>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalOpen}>
                <ModalHeader toggle={this.toggleModalOpen}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <div className='col-12 col-md-12'>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <Label htmlFor='.Rating' >Rating</Label>
                                <Control.select model='.Rating' id='Rating' name='Rating' placeholder='Rating'
                                    className='form-control'>
                                    <option value='1'>1</option>
                                    <option values='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select> 
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='Username'>Your Name</Label>
                                <Control.text model='.Username' id='Username' name='Username' placeholder='Your Name'
                                    className='form-control'
                                    validators={
                                        {required, minLength : minLength(3), maxLength: maxLength(15)}
                                    } 
                                />
                                <Errors
                                        className="text-danger"
                                        model=".Username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
            
                                        }}
                                 />
                        </div>
                        <div className="form-group">
                                <Label htmlFor="Comment">Your Feedback</Label>
                                    <Control.textarea model=".Comment" id="Comment" name="Comment"
                                        rows="12"
                                        className="form-control" />
                        </div>
                    
                    <div className='form-group p-2'>
                        <Button type='submit' color='primary' value='Submit'>Submit</Button>
                    </div>
                    </LocalForm>
                </div>
                </ModalBody>
            </Modal>
            </React.Fragment>

        )
    }
}



function RenderDish ({dish}) {
    if(dish!=null){
        return (
            <div>
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}


function RenderComments({comments,addComment,dishId,postComment}) {
    if(comments!=null){
    let list = comments.map((comment)=>{
    
       if(comment!=null){ 
            return (
                <Fade in>
                <li key={comment.id}>
                    <div>
                        <p>{comment.comment}</p>
                        <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                </li>
                </Fade>
            )
       }
    
        else {
            return (
                <div></div>
            )
        }
    })
    

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {list}
            </ul>
            <CommentForm addComment={addComment} dishId={dishId} postComment ={postComment}/>
        </div>
    )}

    else {
        return (
            <div></div>
        )
    }

}






    const DishDetail = (props) => {
        const dish=props.dish;

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(dish==null)
        {
            return (
                <div></div>
            )
        }
        else{
        return (
            <div className='container'>
                
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                </div>  
                <div className='row m-1'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={dish.id} postComment={props.postComment}/>
                    </div>
                </div>
            </div>
            
        )
        }
    };


export default DishDetail;