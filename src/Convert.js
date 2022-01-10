import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class CurrencyInput extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return <input className="currency-input" value={value} onChange={handleChange} type="number" />
  }
}

class CurrencyConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: 0.83,
      usd: 1,
      euro: 1 * 0.83,
    };

    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.handleEuroChange = this.handleEuroChange.bind(this);
  }

  toUsd(amount, rate) {
    return amount * (1 / rate);
  }

  toEuro(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(2);
  }

  // ...toUsd, toEuro
   handleUsdChange(event) {
    const euro = this.convert(event.target.value, this.state.rate, this.toEuro);
    this.setState({
      usd: event.target.value,
      euro
    });
  }
  handleEuroChange(event) {
    const usd = this.convert(event.target.value, this.state.rate, this.toUsd);
    this.setState({
      euro: event.target.value,
      usd
    });
  }

  render() {
    const { rate, usd, euro } = this.state;
    return (
          <div className="convert-wrap py-4">
            <div className="row convert-inner">
              <div className="col-6">
                <div className="row">
                  <div className="col-6  convert-box">
                    <h6>You Have</h6>
                    <CurrencyInput value={usd} handleChange={this.handleUsdChange} />
                  </div>
                  <div className="col-6 text-center convert-box">
                    <h6 className="currency-name text-center">US Dollar</h6>
                    <div class="dropdown">
                      <button class="btn dropdown-toggle currency-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        USD
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row justify-content-end">
                  <div className="col-6 convert-box">
                    <h6>You Get</h6>
                    <CurrencyInput value={euro} handleChange={this.handleEuroChange} />
                  </div>
                  <div className="col-6 text-center convert-box">
                    <h6 className="currency-name">Euro</h6>
                    <div class="dropdown">
                      <button class="btn dropdown-toggle currency-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        EUR
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           
    )
  }
}

export default CurrencyConverter;