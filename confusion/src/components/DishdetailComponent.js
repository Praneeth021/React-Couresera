import React,{Component} from 'react';
import {Card,CardText,CardBody,CardTitle,CardImg,Breadcrumb,BreadcrumbItem, Button,Row,Modal,ModalBody,ModalHeader, Label, Col,ReactFragment} from 'reactstrap';
import {Link,} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form'

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

    handleSubmit(event){
        this.toggleModalOpen();

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
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
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
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}


function RenderComments({comments}) {
    if(comments!=null){
    let list = comments.map((comment)=>{
       if(comment!=null){ 
            return (
                <li key={comment.id}>
                    <div>
                        <p>{comment.comment}</p>
                        <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                </li>
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
            <CommentForm />
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
        const comments=props.comments
        if(dish==null && comments==null)
        {
            return (
                <div></div>
            )
        }
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {dish.name}
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
            
        )
    };


export default DishDetail;