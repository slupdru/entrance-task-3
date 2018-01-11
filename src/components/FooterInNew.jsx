import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION_CREATE_MEET = gql`
mutation createMeet($title: String!, $dateStart:Date!, $dateEnd:Date!, $usersIds:[ID], $roomId:ID!) {
    createEvent(
        input:{
          title:$title
          dateStart:$dateStart
          dateEnd:$dateEnd
        }
        usersIds:$usersIds
        roomId:$roomId
      ) {
        id
      }
}
`;

class FooterInNew extends React.Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
    }
    onClick() {
        if (this.props._showErrorFun()===true){
        let massOfUsers = [];
        for (let i = 0; i < this.props.usersInNewMeet.length; i++){
            massOfUsers.push(this.props.usersInNewMeet[i].id);
        }
        console.log(this.props.start, this.props.end);
        this.props.mutate({
        variables: { 
            title: this.props.themeInput,
            dateStart:this.props.start,
            dateEnd:this.props.end,
            usersIds:massOfUsers,
            roomId:this.props.roomSelectedId
        }
        })
          .then(({ data }) => {
            console.log('got data', data);
          }).catch((error) => {
            console.log('there was an error sending the query', error);
          });
      }
      else{
        console.log('нет');
    }
    }

    render(){
    return(
    <footer className="footer-new-meet">
        <div className="message-line">
            <div className="message-line_message">Выберите переговорку</div>
        </div>
        <div className="buttons-container">
            <a href="/" className="buttons-container_cancel">Отмена</a>
            <a  onClick={this.onClick} className="header_button-foo">Создать встречу</a>
        </div>
    </footer>
    )
}
}
const FooterInNewWithMut = graphql(MUTATION_CREATE_MEET)(FooterInNew);
export default FooterInNewWithMut;