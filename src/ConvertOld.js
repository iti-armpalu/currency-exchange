import React from 'react';
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

class ConvertOld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: 109.55,
      baseAcronym: 'USD',
      baseValue: 1,
      quoteAcronym: 'GBP',
      quoteValue: 1 * 0.73,
      loading: false,
    };
  }

  componentDidMount() {
    const { baseAcronym, quoteAcronym } = this.state;
    this.getRate(baseAcronym, quoteAcronym);
  }
  getRate = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const rate = data.rates[quote];
        this.setState({
          rate,
          baseValue: 1,
          quoteValue: Number((1 * rate).toFixed(3)),
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toQuote(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(2);
  }

  changeBaseAcronym = (event) => {
    const baseAcronym = event.target.value;
    this.setState({ baseAcronym });
    this.getRate(baseAcronym, this.state.quoteAcronym);
  }

  changeBaseValue(event) {
    const quoteValue = this.convert(event.target.value, this.state.rate, this.toQuote);
    this.setState({
      baseValue: event.target.value,
      quoteValue,
    });
  }

  changeQuoteAcronym = (event) => {
    const quoteAcronym = event.target.value;
    this.setState({ quoteAcronym });
    this.getRate(this.state.baseAcronym, quoteAcronym);
  }

  changeQuoteValue(event) {
    const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
    this.setState({
      quoteValue: event.target.value,
      baseValue,
    });
  }

  render() {
    const { rate, baseAcronym, baseValue, quoteAcronym, quoteValue, loading } = this.state;

    const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym} className="currency-option">{currencyAcronym}</option>);

    return (
      <React.Fragment>

        <div className="text-center p-4 page-heading">
          <h2 className="mb-2">Currency Converter</h2>
        </div>

          <div className="convert-wrap p-5">
            <div className="row convert-inner justify-content-center">
              <div className="col-12">
                <div className="row">

                  <div className="col convert-box">
                    <h6>You Have</h6>
                    <input id="base" className="form-control currency-input" value={baseValue} onChange={this.changeBaseValue} type="number" />
                  </div>

                  <div className="col text-center convert-box">
                    <h6 className="currency-name">{currencies[baseAcronym].name}</h6>
                    <div className="d-flex">
                      <img src='https://upload.wikimedia.org/wikipedia/commons/8/88/United-states_flag_icon_round.svg' className="currency-flag align-self-center" alt=""/>
                      <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control currency-input" disabled={loading}>
                        {currencyOptions}
                      </select>
                      <span className="align-self-center"><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                  </div>

                  <div className="col-1 text-center currency-arrow">
                    <span><FontAwesomeIcon icon={faArrowAltCircleRight} size="2x"/></span>
                  </div>

                  <div className="col convert-box">
                    <h6>You Get</h6>
                    <input id="quote" className="form-control currency-input" value={quoteValue} onChange={this.changeQuoteValue} type="number" />
                  </div>

                  <div className="col text-center convert-box">
                    <h6 className="currency-name">{currencies[quoteAcronym].name}</h6>
                    <div className="d-flex">  
                      <img src='https://upload.wikimedia.org/wikipedia/commons/8/88/United-states_flag_icon_round.svg' className="currency-flag align-self-center" alt=""/>
                      <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control currency-input" disabled={loading}>
                        {currencyOptions}
                      </select>
                      <span className="align-self-center"><FontAwesomeIcon icon={faChevronDown}/></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div className="text-center position-relative h-25">
              <h6 className="position-absolute conversion-date">Conversion date:</h6>
              <h6 className="position-absolute currency-base-to-quote">1 {baseAcronym} = {rate} {quoteAcronym}</h6>
            </div>

          </div>
      </React.Fragment>
    )
  }
}

export default ConvertOld;