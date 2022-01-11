import React from 'react';
import currencies from './utils/currencies';

class Rates extends React.Component {
  constructor(props) {
    super(props);

    // A component state storing the base currency value and the currency rates, the default base currency value will be USD (just personal preference).
    this.state = {
      base: 'USD',
      rates: null,
    };
  }

  // Notice that we don't have to bind the changeBase method to the object in constructor. This is possible because we are using the arrow function syntax for defining changeBase. Since arrow functions do not possess their own this object, it will use the first this object it finds as it searches for one in its higher scope.
  changeBase = (event) => {
    this.setState({ base: event.target.value });
  }

  // Map method is used to create an array of option elements from the key values of the currencies object.

  render () {
    const { base, rates } = this.state;

    return (
      <React.Fragment>
        <form className="p-3 bg-light form-inline justify-content-center">
          <h3 className="mb-2">Base currency: <b className="mr-2">1</b></h3>
          <select value={base} onChange={this.changeBase} className="form-control form-control-lg mb-2">
            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym} - </option>)}
          </select>
        </form>
      </React.Fragment>

    )
  }

}



export default Rates;