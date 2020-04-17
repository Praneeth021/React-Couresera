import React,{Component} from 'react';
import {Nav,Navbar,NavbarBrand,NavbarToggler,NavItem,Jumbotron,Collapse} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component {

    constructor(props){
        super(props)

        this.state = {
            isNavOpen : false,
        }

        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav() {
        this.setState({isNavOpen:!this.state.isNavOpen})
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
            </div>

        )
    }
}


export default Header;









