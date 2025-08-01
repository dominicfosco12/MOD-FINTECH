import React from "react";
import "./PortfolioSummary.css";

const PortfolioSummary = ({ totalPortfolios, totalAccounts, latestNav, totalAUM }) => {
  return (
    <div className="summary-bar">
      <div className="summary-card">
        <div className="summary-title">Portfolios</div>
        <div className="summary-value">{totalPortfolios}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Accounts</div>
        <div className="summary-value">{totalAccounts}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Latest NAV</div>
        <div className="summary-value">{latestNav}</div>
      </div>
      <div className="summary-card">
        <div className="summary-title">Total AUM</div>
        <div className="summary-value">${totalAUM}M</div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
