import React from 'react';

// We write RatesTable as a render function, since we don't need state or life cycle methods.

// It will receive two props, base and rates. There is an early return statement to not render anything when rates is null, because the rates state is set as null in the constructor of "Rates.js".

const RatesTable = (props) => {
  const { base, rates } = props;
  if (!rates) {
    return null;
  }
  return (
    <table className="table table-sm bg-light mt-4">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-right pr-4 py-2">1.00 {base}</th>
        </tr>
      </thead>
      <tbody>
        {rates.map(currency =>
          <tr key={currency.acronym}>
            <td className="pl-4 py-2">{currency.name} <small>({currency.acronym})</small></td>
            <td className="text-right pr-4 py-2">{currency.rate.toFixed(6)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default RatesTable;