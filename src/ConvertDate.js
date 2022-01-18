import React from 'react';

class ConvertDate extends React.Component {
  state = {
    d: "",
    day: "",
    date: "",
    month: "",
    year: "",
  };

  componentDidMount() {
    this.getDate();
  }

  getDate = () => {
    var d = new Date();
    let day = d.toLocaleString("en-US", { weekday : 'long'});
    let date = d.toLocaleString("en-US", { day : '2-digit'});
    let month = d.toLocaleString("en-US", { month: "long" })
    ;
    let year = d.toLocaleString("en-US", { year : 'numeric'});
    this.setState({ d, day, date, month, year });
  };

  render() {
    const { day, date, month, year } = this.state;

    return <span className="mx-2">{day}, {date} {month} {year} </span>;
  }
}


export default ConvertDate;
