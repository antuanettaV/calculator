import React, { useState } from "react";
import styles from "./Calculator.module.css";

const MortgageCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(300000);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25);
  const [mortgageType, setMortgageType] = useState("Repayment");
  const [monthlyRepayment, setMonthlyRepayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const calculateRepayments = () => {
    console.log("Inputs:", mortgageAmount, mortgageTerm, interestRate);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = mortgageTerm * 12;
  
    let repayment;
    if (mortgageType === "Repayment") {
      repayment =
        (mortgageAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalPayments));
    } else {
      repayment = mortgageAmount * monthlyRate;
    }
  
    setMonthlyRepayment(repayment.toFixed(2));
    setTotalRepayment((repayment * totalPayments).toFixed(2));
    console.log("Calculated Monthly Repayment:", repayment.toFixed(2));
  };

  const clearFields = () => {
    setMortgageAmount(0);
    setMortgageTerm(0);
    setInterestRate(0);
    setMonthlyRepayment(null);
    setTotalRepayment(null);
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.header}>
          <h2 className={styles.header}>Mortgage Calculator</h2>
          <button className={styles.clearButton} onClick={clearFields}>
            Clear All
          </button>
        </div>
        <div className={styles.formGroup}>
          <label>Mortgage Amount</label>
          <div className={styles.inputGroup}>
            <span>£</span>
            <input
              type="number"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Mortgage Term</label>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={mortgageTerm}
              onChange={(e) => setMortgageTerm(e.target.value)}
            />
            <span>years</span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Interest Rate</label>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <span>%</span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Mortgage Type</label>
          <div className={styles.radioGroup}>
            <label className={mortgageType === "Repayment" ? styles.active : ""}>
              <input
                type="radio"
                value="Repayment"
                checked={mortgageType === "Repayment"}
                onChange={(e) => setMortgageType(e.target.value)}
              />
              Repayment
            </label>
            <label className={mortgageType === "Interest Only" ? styles.active : ""}>
              <input
                type="radio"
                value="Interest Only"
                checked={mortgageType === "Interest Only"}
                onChange={(e) => setMortgageType(e.target.value)}
              />
              Interest Only
            </label>
          </div>
        </div>
        <button className={styles.calculateButton} onClick={calculateRepayments}>
          Calculate Repayments
        </button>
      </div>
      <div className={styles.results}>
        <h3>Your Results</h3>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
        {monthlyRepayment && (
          <div className={styles.resultsSummary}>
            <p className={styles.monthlyRepayment}>
              Your monthly repayments: <strong>£{monthlyRepayment}</strong>
            </p>
            <p className={styles.totalRepayment}>
              Total you'll repay over the term: 
              <strong>£{totalRepayment}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;


