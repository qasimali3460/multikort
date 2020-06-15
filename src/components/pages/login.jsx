import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Breadcrumb from "../common/breadcrumb";
import Message from './message'
import {login, socialLogin, reset} from '../../actions/auth'
import TwitterLogin from 'react-twitter-auth'



class Login extends Component {

    constructor (props) {
        super (props)
        this.state = {
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
        const {email, password} = this.state
        const user = {
            email: email,
            password: password
        }
        this.props.login(user)
    }
    facebookCallBack = obj => {
        console.log('got api', obj)
        const payload = {
            firstName: obj.name,
            lastName: obj.name,
            photoUrl: `https://graph.facebook.com/${obj.id}/picture?type=large`,
            email: obj.email,
            loginProvider: "facebook",
            "providerKey": obj.id,
        }
        this.props.socialLogin(payload)
    }
    componentDidMount()
    {
        this.props.reset()
    }
    render (){
        const {email, password} = this.state
        const {message, loading } = this.props
        const fbId = 214316756448420

        return (
            <div>
                <Breadcrumb title={'Login'}/>

                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                <div className="form-group" style={styles.container}>
                                        <FacebookLogin
                                            appId={fbId}
                                            onClick={e => {}}
                                            callback={this.facebookCallBack}
                                            render={renderProps => (
                                                <button onClick={renderProps.onClick} className="btn btn-icon btn-m btn-full shadow-l bg-facebook text-uppercase font-900 text-left" style={styles.facebook}>
                                                    <i className="fa fa-facebook-f text-center" style={styles.icon}></i>
                                                        Login with Facebook
                                                </button>
                                            )}
                                        />
                                        <button className="btn btn-icon btn-m btn-full shadow-l text-uppercase font-900 text-left" style={styles.twitter}>
                                            <i className="fa fa-twitter text-center" style={styles.twitterIcon}></i>
                                                Login with Twitter
                                        </button>
                                        </div>
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
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Email"
                                                   required name="email" value={email} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" id="review"  name="password"
                                                   placeholder="Enter your password" required value={password} onChange={this.handleChange}/>
                                        </div>
                                        <button type="submit" disabled={loading} className="btn btn-solid">Login</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href="#" className="btn btn-solid">Create an Account</a>
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
        login: bindActionCreators(login, dispatch),
        socialLogin: bindActionCreators(socialLogin, dispatch),
        reset: bindActionCreators(reset, dispatch),
    }
}

const mapStateToProps = state => {
    return {
        message: state.auth.message,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles= {
    container: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    twitter: {
        position: 'relative',
        padding: '10px 15px 10px 44px',
        background: '#4099ff',
        color: 'white'
    },
    facebook: {
        position: 'relative',
        padding: '10px 15px 10px 44px',
        background: '#3b5998',
        color: 'white'
    },
    icon: {
        textAlign: "center !important",
        background: '#2a4377',
        width: 32,
        position: "absolute",
        left: 0,
        height: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0
    },
    twitterIcon: {
        textAlign: "center !important",
        background: 'rgb(53, 123, 204)',
        width: 32,
        position: "absolute",
        left: 0,
        height: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0
    }
}