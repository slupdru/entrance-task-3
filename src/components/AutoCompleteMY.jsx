import React from "react";
import ReactAutocomplete from "react-autocomplete";
class AutoCompleteMY extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        value: '',
      }
    }
  
    render() {
        
      return (
        <ReactAutocomplete
          items={this.props.list}
          shouldItemRender={(item, value) => item.login.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.login}
          renderItem={(item, highlighted) =>
            <div className={'list_memb-block'}
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : '#fff'}}
            >
                <img className='membres-show_icon' src={item.avatarUrl} alt=""/>
                <div className="list_name"><span>{item.login}</span><span className="item_floor"> · {item.homeFloor} этаж</span></div>

            </div>
          }
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          onSelect={value => {
            this.props.addUser(value);
            this.setState({
              value:''
            })
          }}
        />
      )
    }
  }
  
export default AutoCompleteMY;