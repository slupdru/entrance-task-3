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
        this.props.mutate({
        variables: { 
            title: 'Обсуждения важные',
            dateStart:'2018-01-07T14:30:45.678Z',
            dateEnd:'2018-01-07T16:30:45.678Z',
            usersIds:[2,3],
            roomId:4
        }
        })
          .then(({ data }) => {
            console.log('got data', data);
          }).catch((error) => {
            console.log('there was an error sending the query', error);
          });
      }

    render(){
    return(
    <footer className="footer-new-meet">
        <div className="message-line">
            <div className="message-line_message">Выберите переговорку</div>
        </div>
        <div className="buttons-container">
            <a href="/" className="buttons-container_cancel">Отмена</a>
            <a href="/" onClick={this.onClick} className="header_button-foo">Создать встречу</a>
        </div>
    </footer>
    )
}
}
const FooterInNewWithMut = graphql(MUTATION_CREATE_MEET)(FooterInNew);
export default FooterInNewWithMut;