import React from 'react';
import ReactDOM from "react-dom";
import './index.css';


  class List extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        item: "",
        itemCount: 0,
        itemDone: 0,
        width: '0%',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkChange = this.checkChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
      this.setState({
        items: [],
        item: "",
        itemCount: 0,
        itemDone: 0,
        width: '0%',
      })
    }

    handleChange(event) {
      this.setState({
        item: event.target.value
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const wid = ((this.state.itemDone/(this.state.itemCount+1))*100)+"%";
      this.setState({
        items: [...this.state.items, this.state.item],
        item: "",
        itemCount: this.state.itemCount+1,
        width: wid
      });
    }

    checkChange(event) {
      if(event.target.checked){
        const wid = (((this.state.itemDone+1)/this.state.itemCount)*100)+"%";
        this.setState({
          itemDone: this.state.itemDone + 1,
          width: wid
        });
        if(wid==="100%"){
          alert("You're finished with your list!");
        }
      } else {
        const wid = (((this.state.itemDone-1)/this.state.itemCount)*100)+"%";
        this.setState({
          itemDone: this.state.itemDone -1,
          width: wid
        })
      }
    }


    render() {

      const items = this.state.items;

      const list = items.map((item, index) => {
      return(
      <li key={index}>
      <input type="checkbox" value={item} onChange= {this.checkChange}/>
        {item}
        </li>
        );
    });

    const barStyle = {
      width: this.state.width,
      height: '30px',
      background: '#4CAF50',
      color: 'white'
    };
      return (
        <div className="app">
          <div className="list-input">
            <form className="app-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.item} onChange={this.handleChange} />
              <input type="submit" value="Submit" className="submit-button"/>
          </form>
          <div className="list-prog">
            Total items: {this.state.itemCount}
          </div>
          <div className="list-prog">
            Completed items: {this.state.itemDone}
          </div>
          <div className="myProgress">
            <div style={barStyle} className="myBar">
              {this.state.width}
            </div>
          </div>
          </div>
          <div className="todo-list">
          <ul>
            {list}
          </ul>
          </div>
          <button className="clear-button" onClick={this.handleClick}>Clear</button>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <List />,
    document.getElementById('root')
  );
  