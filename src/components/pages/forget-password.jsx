import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {forgetPassword} from '../../actions/auth'

import Breadcrumb from "../common/breadcrumb";
import Message from './message'

class ForgetPassword extends Component {
    
    constructor (props) {
        super (props)
        this.state = {
            email: '',
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const {email} = this.state
        this.props.forgetPassword(email)
    }
    render (){
        const {email} = this.state
        const {message, error} = this.props

        return (
            <div>
                <Breadcrumb title={'forget password'}/>
                
                
                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                            <div className="col-md-8 offset-md-2">
                                                {message && 
                                                    <Message
                                                        message={message}
                                                        danger={error}
                                                    />
                                                }
                                            </div>
                                <h2>Forget Your Password</h2>
                                <form className="theme-form" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" id="email"
                                                   placeholder="Enter Your Email" required="" 
                                                    name="email" value={email} onChange={this.handleChange}
                                                />
                                        </div>
                                        <button type="submit" className="btn btn-solid">Submit</button>
                                    </div>
                                </form>
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
        forgetPassword: bindActionCreators(forgetPassword, dispatch),
    }
}

const mapStateToProps = state => {
    return {
        message: state.auth.message,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
