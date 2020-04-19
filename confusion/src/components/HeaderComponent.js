import React,{Component} from 'react';
import {Nav,Navbar,NavbarBrand,NavbarToggler,NavItem,Jumbotron,Collapse,Form,FormGroup,Input,Col,Button,Modal,ModalBody,ModalHeader, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component {

    constructor(props){
        super(props)

        this.state = {
            isNavOpen : false,
            isModalOpen : false,
        }

        this.toggleNav = this.toggleNav.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    toggleNav() {
        this.setState({isNavOpen:!this.state.isNavOpen})
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen,
        })
    }

    handleSubmit(event){
        this.toggleModal();
        event.preventDefault();
        alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
    }

    render() {
        return (
            <div>
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarBrand className='mr-auto' href='#'><img src='assets/images/logo.png'  height='60' width='60' alt='Restaurant Con-Fusion'/></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} className='ml-auto'/>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className='ml-auto'>
                                <NavItem>
                                    <NavLink className='nav-link' to='/home'><span className='fa fa-home'> Home</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/aboutus'><span className='fa fa-info'> About us</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/menu'><span className='fa fa-list'> Menu</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/contactus'><span className='fa fa-address-card'> Contact us</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className='fa fa-sign-in'> Login </span></Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-5'>
                                <h1>Restaurant Con-Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label md={2} htmlFor='username'>Username</Label>
                                <Col md={10}>
                                    <Input type='text' name='username' id='username' placeholder='Username' innerRef={(input) => this.username = input} />
                                </Col>
                            </FormGroup>
                            <FormGroup row >
                                <Label md={2}htmlFor='password'>Password</Label>
                                <Col md={10}>
                                    <Input type='password' name='password' id='password'placeholder='Password' innerRef={(input) => this.password = input} />
                                </Col>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' name='remember' innerRef={(input) => this.remember = input} />
                                    <strong>Remember Me?</strong>
                                </Label>
                            </FormGroup>
                            <FormGroup className='form-group pt-2'>
                                <Button type='submit' className='btn btn-primary-outline'>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}


export default Header;









