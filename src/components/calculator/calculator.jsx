import { useState, useEffect, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import Input from "../styled/input";
import Button from "../styled/button";
import PercentCalculator from "../percent-calculator/percentCalculator";
import { leverages, percent } from "../../services/calculator.service";
import question from "../../assets/images/question.png";
import "./calculator.css";
import { useTranslation } from "react-i18next";

const Calculator = (props) => {
  const { t } = useTranslation();
  const [commission, setCommision] = useState(0.1);
  const [leverage, setLeverage] = useState(1);
  const [profit, setProfit] = useState(4);
  const [stopLoss, setStopLoss] = useState(2);
  const [amount, setAmount] = useState(0);
  const [profitTarget, setProfitTarget] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sharesNumber, setSharesNumber] = useState(20);
  const [sellingPrice, setSellingPrice] = useState(55);
  const [stopLossPrice, setStopLossPrice] = useState(48);
  const [profitTax, setProfitTax] = useState(0);
  const [lostTax, setLostTax] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [grossLost, setGrossLost] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [netLost, setNetLost] = useState(0);
  const [amountChanged, setAmountChanged] = useState(false);
  const [currencySign, setCurrencySign] = useState("₪");

  useEffect(() => {
    setAmount((prevState) =>
      props.selectedCurrency === "ils"
        ? prevState * props.rate
        : prevState / props.rate
    );
    setCurrencySign(props.selectedCurrency === "ils" ? "₪" : "$");
    setAmountChanged(true);
  }, [props.selectedCurrency]);

  const handleInput = (id, event) => {
    const inputValue = event.target.value;
    switch (id) {
      case "commission":
        setCommision(inputValue);
        break;
      case "leverage":
        setLeverage(inputValue);
        break;
      case "profit":
        setProfit(inputValue);
        break;
      case "stoploss":
        setStopLoss(inputValue);
        break;
      case "amount":
        setAmount(inputValue);
        break;
      case "buyPrice":
        setBuyPrice(inputValue);
        break;
      case "profitTarget":
        setProfitTarget(inputValue);
        break;
      case "stopLossPrice":
        setStopLossPrice(inputValue);
        break;
      case "sharesNumber":
        setSharesNumber(inputValue);
        break;
      case "sellingPrice":
        console.log("sellingPrice", inputValue);
        setSellingPrice(inputValue);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (id, event) => {
    const pattern = id === "commission" ? /[\d.]/ : /^[0-9]$/;
    const inputValue = event.target.value;
    if (id === "commission" && inputValue.includes(".") && event.key === ".") {
      event.preventDefault();
      return;
    }
    if (id === "amount" && inputValue.length === 0 && event.key === "0") {
      event.preventDefault();
      return;
    }
    if (!(event.key === "Backspace" || pattern.test(event.key))) {
      event.preventDefault();
    }
  };

  const calculateTradeByAmount = () => {
    const targetProfit = amount * ((leverage * profit) / 100 + 1) - amount;
    setGrossProfit(targetProfit);
    const stopLossTarget = amount * ((leverage * stopLoss) / 100 + 1) - amount;
    setGrossLost(stopLossTarget);
    const lossTax = stopLossTarget * 0.25;
    setLostTax(lossTax);
    const profitTax = targetProfit * 0.25;
    setProfitTax(profitTax);
    const TotalCommission = 2 * (commission / 100) * amount;
    setTotalCommission(TotalCommission);
    setNetProfit(targetProfit - TotalCommission - profitTax);
    setNetLost(stopLossTarget + TotalCommission - lossTax);
  };

  const calculateTradeByPrice = () => {
    const investmentAmount = sharesNumber * buyPrice;
    const targetProfit = sharesNumber * sellingPrice;
    const grossTargetProfit = Math.abs(targetProfit - investmentAmount);
    setGrossProfit(grossTargetProfit);
    const profitTax = grossTargetProfit * 0.25;
    setProfitTax(profitTax);
    const stopLossTarget = sharesNumber * stopLossPrice;
    const grossTargetLoss = Math.abs(stopLossTarget - investmentAmount);
    setGrossLost(grossTargetLoss);
    const lossTax = grossTargetLoss * 0.25;
    setLostTax(lossTax);
    const totalCommission = 2 * (commission / 100) * investmentAmount;
    setTotalCommission(totalCommission);
    setNetProfit(grossTargetProfit - totalCommission - profitTax);
    setNetLost(grossTargetLoss + totalCommission - lossTax);
  };

  const calculateTrade = useCallback(() => {
    if (props.selectedOption == "amount") {
      calculateTradeByAmount();
    } else if (props.selectedOption == "price") {
      calculateTradeByPrice();
    }
  }, [
    // amount,
    // commission,
    // leverage,
    // profit,
    // stopLoss,
    // buyPrice,
    // profitTarget,
    // stopLossPrice,
    // sellingPrice,
    calculateTradeByAmount,
    calculateTradeByPrice,
    props.selectedOption,
  ]);

  useEffect(() => {
    if (amountChanged) {
      calculateTrade();
      setAmountChanged(false);
    }
  }, [amount, amountChanged, calculateTrade]);

  useEffect(() => {
    clearCalculator();
  }, [props.selectedOption]);

  const clearCalculator = () => {
    setCommision(0.1);
    setLeverage(1);
    setProfit(4);
    setStopLoss(2);
    setAmount(0);
    setNetProfit(0);
    setNetLost(0);
    setBuyPrice(0);
    setSharesNumber(20);
    setSellingPrice(55);
    setStopLossPrice(48);
  };

  const clearInput = () => {
    if (!amount) {
      setAmount("");
    }
  };

  const checkIsFloat = (number) => {
    if (number.toString().includes(".")) {
      return number.toFixed(1);
    }
    return number;
  };

  const dynamicContainerClassName = ` ${"calculator-container"} ${
    props.calculatorIndex > 0 ? "border-top" : ""
  }`;

  const dynamicInputsClassName = ` ${"inputs-container"} ${
    props.language === "en" ? "row-reverse" : ""
  }`;

  const dynamicInputClassName = ` ${"input-container"} ${
    props.language === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className={dynamicContainerClassName}>
      {props.selectedOption === "amount" && (
        <div className={dynamicInputsClassName}>
          <div className={dynamicInputClassName}>
            <label htmlFor="commission">{t("commission")}</label>
            <Input
              type="number"
              id="commission"
              value={commission}
              onkeypress={(e) => handleKeyPress("commission", e)}
              onchange={(e) => handleInput("commission", e)}
              maxlength="4"
              lang={props.language}
            />
          </div>
          <div className={dynamicInputClassName}>
            <label htmlFor="leverage">{t("leverage")}</label>
            <Input
              type="dropdown"
              id="leverage"
              value={leverage}
              options={leverages}
              onchange={(e) => handleInput("leverage", e)}
              lang={props.language}
            />
          </div>
          <div className={dynamicInputClassName}>
            <label htmlFor="stoploss">{t("stopLoss")}</label>
            <Input
              type="dropdown"
              id="stoploss"
              value={stopLoss}
              options={percent}
              onchange={(e) => handleInput("stoploss", e)}
              lang={props.language}
            />
          </div>
          <div className={dynamicInputClassName}>
            <label htmlFor="profit">{t("profitTarget")}</label>
            <Input
              type="dropdown"
              id="profit"
              value={profit}
              options={percent}
              onchange={(e) => handleInput("profit", e)}
              lang={props.language}
            />
          </div>
          <div className={dynamicInputClassName}>
            <label htmlFor="amount">{t("investment")}</label>
            <Input
              type="number"
              id="amount"
              value={checkIsFloat(amount)}
              onkeypress={(e) => handleKeyPress("amount", e)}
              onchange={(e) => handleInput("amount", e)}
              onfocus={clearInput}
              maxlength="7"
              lang={props.language}
            />
          </div>
        </div>
      )}
      {props.selectedOption === "price" && (
        <PercentCalculator
          language={props.language}
          handleKeyPress={handleKeyPress}
          handleInput={handleInput}
          tradeData={{
            sharesNumber,
            buyPrice,
            sellingPrice,
            stopLossPrice,
            commission,
          }}
        />
      )}
      <div>
        <div
          className={`buttons-container ${
            props.language === "en" ? "row-reverse" : ""
          }`}
        >
          <div
            className={`calc-button ${
              props.language === "en" ? "max-margin-left" : ""
            }`}
          >
            <Button
              text={t("calculate")}
              onclick={calculateTrade}
              disabled={
                amount < 100 &&
                (!buyPrice ||
                  !sharesNumber ||
                  !sellingPrice ||
                  !stopLossPrice ||
                  (buyPrice >= sellingPrice && buyPrice >= stopLossPrice) ||
                  (buyPrice <= sellingPrice && buyPrice <= stopLossPrice))
              }
            />
          </div>
          <div
            className={`add-remove-button ${
              props.language === "en" ? "small-margin-left row-reverse" : ""
            }`}
          >
            {props.calculatorIndex > 0 && (
              <Button
                text="-"
                onclick={props.handleRemoveCalculator}
                size="small"
                title={t("remove")}
              />
            )}
            <Button
              text="+"
              onclick={props.handleAddCalculator}
              size="small"
              title={t("add")}
              disabled={props.calculatorInstances.length === 4}
            />
          </div>
        </div>
      </div>
      {netProfit ? (
        <div>
          <div
            className={`results ${
              props.language === "en" ? "text-align-left en-direction" : ""
            }`}
          >
            <div className="green neto">
              {checkIsFloat(netProfit)}
              {currencySign} :{t("net profit")}
            </div>
            <div className="red align-center">
              <img
                className="small-icon"
                src={question}
                alt=""
                data-tooltip-id="my-tooltip"
                data-tooltip-content={t("commissionInfo")}
                data-tooltip-place="top"
                id="clickable"
              />
              <Tooltip
                id="my-tooltip"
                anchorSelect="#clickable"
                clickable
                openOnClick="true"
                data-tooltip-delay-hide="1000"
              />
              {checkIsFloat(totalCommission)}
              {currencySign} :{t("totalCommission")}
            </div>
            <div className="red">
              {checkIsFloat(profitTax)}
              {currencySign} :{t("profitTax")}
            </div>
            <div className="green">
              {checkIsFloat(grossProfit)}
              {currencySign} :{t("grossProfit")}
            </div>
            <div className="green">{t("profitScenario")}</div>
          </div>
          <div
            className={`results ${
              props.language === "en" ? "text-align-left en-direction" : ""
            }`}
          >
            <div className="red neto">
              {checkIsFloat(netLost)}
              {currencySign} :{t("netLost")}
            </div>
            <div className="red align-center">
              {checkIsFloat(totalCommission)}
              {currencySign} :{t("totalCommission")}
            </div>
            <div className="green align-center">
              <img
                className="small-icon"
                src={question}
                alt=""
                data-tooltip-id="my-tooltip"
                data-tooltip-content={t("refund")}
                data-tooltip-place="top"
                id="clickable"
              />
              <Tooltip
                id="my-tooltip"
                anchorSelect="#clickable"
                clickable
                openOnClick="true"
                data-tooltip-delay-hide="1000"
              />
              {checkIsFloat(lostTax)}
              {currencySign} :{t("taxRefund")}
            </div>
            <div className="red">
              {checkIsFloat(grossLost)}
              {currencySign} :{t("grossLost")}
            </div>
            <div className="red">{t("lossScenario")}</div>
          </div>
        </div>
      ) : null}

      {netProfit ? (
        <Button text={t("clear")} onclick={clearCalculator} />
      ) : null}
    </div>
  );
};

export default Calculator;
