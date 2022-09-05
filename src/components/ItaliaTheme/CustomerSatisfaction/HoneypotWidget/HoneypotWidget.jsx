import React from 'react';
import './honeypot_widget.css';

const HoneypotWidget = ({ updateFormData }) => {
  const field = __CLIENT__
    ? process.env.RAZZLE_HONEYPOT_FIELD ?? window.env.RAZZLE_HONEYPOT_FIELD
    : null;

  return __CLIENT__ && field ? (
    <div className="hpt_widget rrr">
      <div className="form-group">
        <label htmlFor="hpt">hpt</label>
        <input
          type="text"
          name={field}
          onChange={(e) => {
            updateFormData(field, e.target.value);
          }}
          id="hpt"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HoneypotWidget;
