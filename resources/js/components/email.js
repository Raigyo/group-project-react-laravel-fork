import React, { Component } from 'react';
import { appSendMails } from './helpers';
export default class Email extends Component {

constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
  this.addMail = this.addMail.bind(this);
  this.handleSubmit= this.handleSubmit.bind(this);
  this.state = {
    email: [{toMail:""}],
    from: "",
    eventName: "",
  }
}

handleChange(event) {
  if (["toMail"].includes(event.target.className) ) {
      let email = [...this.state.email];
      email[event.target.dataset.id][event.target.className] = event.target.value.toLowerCase();
      this.setState({ email }, () => console.log(this.state.email));
    }
    else {
      this.setState({ [e.target.toMail]: e.target.value.toLowerCase() });
    }
}

addMail(event) {
    this.setState((prevState) => ({
      email: [...prevState.email, {toMail:""}],
    }));
  }

handleSubmit(event){
  event.preventDefault()
  //console.log("To send: "+JSON.stringify(this.state.email));
  //console.log("user-id-storage: "+JSON.parse(sessionStorage.getItem("user-id-storage")));
  //console.log("user-name-storage: "+JSON.parse(sessionStorage.getItem("user-name-storage")));
    let senderId = sessionStorage.getItem("user-id-storage");
    let senderName = sessionStorage.getItem("user-name-storage");
    //console.log(this.props.nameEvent);
    let myJSON = { "eventId": this.props.idEvent, "eventName": this.props.nameEvent,"senderId": senderId, "senderName": senderName, "emailList": JSON.stringify(this.state.email)}
    console.log(myJSON);
}

render() {

    let {from, eventName, email} = this.state;

    return (

      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        <button onClick={this.addMail}>Add new recipient</button>
        {
          email.map((val, idx)=> {
            let mailId = `mail-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={mailId}>{`mail #${idx + 1}`}</label>
                <input
                  type="text"
                  name={mailId}
                  data-id={idx}
                  id={mailId}
                  onChange={this.handleChange}
                  value={email[idx].toMail}
                  className="toMail"
                />
              </div>
            )
          })
        }
        <input type="submit" value="Submit" />
      </form>
    )
  }//\render
}//\class
