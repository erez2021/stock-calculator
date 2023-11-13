import { useState, useEffect } from "react";
import Input from "../styled/input";
import Button from "../styled/button";
import { leverages, percent } from "../../services/calculator.service";
import "./calculator.css";
import { useTranslation } from "react-i18next";

const Calculator = (props) => {
  const { t } = useTranslation();
  const [commission, setCommision] = useState(0.1);
  const [leverage, setLeverage] = useState(1);
  const [profit, setProfit] = useState(4);
  const [stopLoss, setStopLoss] = useState(2);
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [profitBeforeReduce, setProfitBeforeReduce] = useState(0);
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
    setCurrencySign((prevState) =>
      props.selectedCurrency === "ils" ? "₪" : "$"
    );
    setAmountChanged(true);
  }, [props.selectedCurrency]);

  useEffect(() => {
    if (amountChanged) {
      calculateTrade();
      setAmountChanged(false); // Reset the flag
    }
  }, [amount, amountChanged]);

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

  const calculateTrade = () => {
    const targetProfit = amount * ((leverage * profit) / 100 + 1) - amount;
    setProfitBeforeReduce(targetProfit);
    const tradeTax = targetProfit * 0.25;
    setTax(tradeTax);
    const TotalCommission = 2 * (commission / 100) * amount;
    setTotalCommission(TotalCommission);
    setNetProfit(targetProfit - TotalCommission - tradeTax);
  };

  const clearCalculator = () => {
    setCommision(0.1);
    setLeverage(1);
    setProfit(4);
    setStopLoss(2);
    setAmount(0);
    setNetProfit(0);
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
            onchange={(e) => handleInput("stopLoss")}
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
              disabled={amount < 100}
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
            />
          </div>
        </div>
      </div>
      {netProfit ? (
        <div>
          <div
            className={`results ${
              props.language === "en"
                ? "row-reverse text-align-left en-direction"
                : ""
            }`}
          >
            <div className="green neto">
              {checkIsFloat(netProfit)}
              {currencySign} :{t("net profit")}
            </div>
            <div className="red">
              {checkIsFloat(totalCommission)}
              {currencySign} :{t("totalCommission")}
            </div>
            <div className="red">
              {checkIsFloat(tax)}
              {currencySign} :{t("tax")}
            </div>
            <div className="green">
              {checkIsFloat(profitBeforeReduce)}
              {currencySign} :{t("grossProfit")}
            </div>
          </div>
          <div
            className={`results ${
              props.language === "en"
                ? "row-reverse text-align-left en-direction"
                : ""
            }`}
          >
            <div className="red neto">
              {checkIsFloat(netProfit)}
              {currencySign} :{t("netLost")}
            </div>
            <div className="red">
              {checkIsFloat(totalCommission)}
              {currencySign} :{t("totalCommission")}
            </div>
            <div className="green">
              {checkIsFloat(tax)}
              {currencySign} :{t("tax")}
            </div>
            <div className="red">
              {checkIsFloat(profitBeforeReduce)}
              {currencySign} :{t("grossLost")}
            </div>
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
