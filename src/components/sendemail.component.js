// sendemail.component.js

import React, {Component} from 'react';
import axios from 'axios';

export default class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.onChangeSenderName = this.onChangeSenderName.bind(this);
        this.onChangeSenderEmailPasswd = this.onChangeSenderEmailPasswd.bind(this);
        this.onChangeReceiverName = this.onChangeReceiverName.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeContents = this.onChangeContents.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sender_name: '',
            sender_email_passwd: '',
            receiver_name: '',
            subject: '',
            contents: ''
        }
    }

    onChangeSenderName(e) {
        this.setState({
            sender_name: e.target.value
        });
    }

    onChangeSenderEmailPasswd(e) {
        this.setState({
            sender_email_passwd: e.target.value
        });
    }

    onChangeReceiverName(e) {
        this.setState({
            receiver_name: e.target.value
        });
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onChangeContents(e) {
        this.setState({
            contents: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            sender_name: this.state.sender_name,
            sender_email_passwd: this.state.sender_email_passwd,
            receiver_name: this.state.receiver_name,
            subject: this.state.subject,
            contents: this.state.contents
        }
        axios.post('http://localhost:4000/business/sendemail', obj)
            .then(res => console.log(res.data))
            .catch(function (err) {
                alert(err);
            })
        this.setState({
            sender_name: '',
            sender_email_passwd: '',
            receiver_name: '',
            subject: '',
            contents: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Send Email</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Sender Email Address: </label>
                        <input type="text" className="form-control" value={this.state.sender_name} onChange={this.onChangeSenderName} />
                    </div>
                    <div className="form-group">
                        <label>Sender Email Password: </label>
                        <input type="password" className="form-control" value={this.state.sender_email_passwd} onChange={this.onChangeSenderEmailPasswd} />
                    </div>
                    <div className="form-group">
                        <label>Receiver Email Address: </label>
                        <input type="text" className="form-control" value={this.state.receiver_name} onChange={this.onChangeReceiverName} />
                    </div>
                    <div className="form-group">
                        <label>Subject: </label>
                        <input type="text" className="form-control" value={this.state.subject} onChange={this.onChangeSubject} />
                    </div>
                    <div className="form-group">
                        <label>Contents: </label>
                        <textarea type="text" className="form-control" value={this.state.contents} onChange={this.onChangeContents} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Send" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}