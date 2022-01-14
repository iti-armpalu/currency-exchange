// RatesTable.js
import React from 'react';
import { Link } from "react-router-dom";
import currencies from './utils/currencies';

// We write RatesTable as a render function, since we don't need state or life cycle methods.

// It will receive two props, base and rates. There is an early return statement to not render anything when rates is null, because the rates state is set as null in the constructor of "Rates.js".

const RatesTable = (props) => {
  const { base, rates } = props;
  if (!rates) {
    return null;
  }
  return (
    <React.Fragment>
    <table className="table table-sm w-75 mx-auto">
      <thead>
        <tr>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {rates.map(currency =>
          <tr key={currency.acronym} className="tr-border text-center">

            <td className="px-2 py-3 align-middle table-flag"><img src={currencies[currency.acronym].flag} className="currency-flag align-self-center" alt=""/></td>

            <td className="px-2 py-3 align-middle table-acronym">{currency.acronym}</td>

            <td className="px-2 py-3 align-middle table-name">{currency.name}</td>

            <td className="text-right px-2 py-3 align-middle table-rate"><Link to={`/convert?base=${base}&quote=${currency.acronym}`}>{currency.rate.toFixed(6)}</Link></td>
          </tr>
        )}
      </tbody>
    </table>
    </React.Fragment>
  )
}

export default RatesTable;