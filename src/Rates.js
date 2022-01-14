import React from 'react';
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';
import RatesTable from './RatesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

    // A component state storing the base currency value and the currency rates, the default base currency value will be USD (just personal preference).
  class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseAcronym: 'USD',
      rates: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  // Notice that we don't have to bind the changeBase method to the object in constructor. This is possible because we are using the arrow function syntax for defining changeBase. Since arrow functions do not possess their own this object, it will use the first this object it finds as it searches for one in its higher scope.
  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }

  getRatesData = (base) => {
    this.setState({ loading: true });
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies[acronym].name,
            symbol: currencies[acronym].symbol,
          }))

        this.setState({ rates, loading: false });
      })
      .catch(error => console.error(error.message));
  }

  // Map method is used to create an array of option elements from the key values of the currencies object.

  render () {
    const { baseAcronym, rates } = this.state;

    const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym} className="currency-option">{currencyAcronym}</option>);

    return (
      <React.Fragment>
        <div className="text-center p-4 page-heading">
          <h2 className="mb-2">Currency Rates</h2>
        </div>

        <div className="convert-wrap p-5">
          <div className="row convert-inner">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <h3 className="mb-0">Base currency: <span className="mx-2">1</span></h3>
              <div className="text-center convert-box">
                <div className="d-flex">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/8/88/United-states_flag_icon_round.svg' className="currency-flag align-self-center" alt=""/>
                  <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control currency-input">
                    {currencyOptions}
                  </select>
                  <span className="align-self-center"><FontAwesomeIcon icon={faChevronDown} /></span>
                </div>
              </div>

            </div>
                
          </div>

          <RatesTable base={baseAcronym} rates={rates} />
          </div>
          <h3>Hello2</h3>
      </React.Fragment>
    )
  }
}

export default Rates;