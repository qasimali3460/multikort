import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {register, reset} from '../../actions/auth'
import Breadcrumb from "../common/breadcrumb";
import Message from './message'

class Register extends Component {

    constructor (props) {
        super (props)
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: ''
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const {fname, lname, email, password} = this.state
        const user = {
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
        }
        this.props.register(user)
    }
    componentDidMount()
    {
        this.props.reset()
    }

    render (){
        const {fname, lname, email, password} = this.state
        const {message, loading } = this.props

        return (
            <div>
                <Breadcrumb title={'create account'}/>
                
                
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={this.handleSubmit}>
                                        <div className="form-row">
                                            <div className="col-md-4 offset-md-4">
                                                {message && 
                                                    <Message
                                                        message={message}
                                                        danger={true}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">First Name</label>
                                                <input type="text" className="form-control" id="fname"
                                                       placeholder="First Name" name="fname" 
                                                       value={fname} required onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Last Name</label>
                                                <input type="text" className="form-control" id="lname"
                                                       placeholder="Last Name" name="lname" 
                                                       value={lname} required onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="email" className="form-control" id="email"
                                                       placeholder="Email" name="email" 
                                                       value={email} required onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" className="form-control" id="review"
                                                       placeholder="Enter your password" name="password" minLength="6" 
                                                       value={password} required onChange={this.handleChange}/>
                                            </div>
                                            <input disabled={loading} type="submit" className="btn btn-solid" value="create Account" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        register: bindActionCreators(register, dispatch),
        reset: bindActionCreators(reset, dispatch),
    }
}

const mapStateToProps = state => {
    return {
        message: state.auth.message,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
