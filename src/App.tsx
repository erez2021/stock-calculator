import "./App.css";

import Trades from "./components/trades/trades";
import Header from "./components/header/header";
import About from "./components/about/about";
import Calculator from "./components/calculator/calculator";
import Index from "./components/index/index";
import Button from "./components/styled/button";
import { useEffect, useState } from "react";
import Axios from "axios";
import Input from "./components/styled/input";
import { currencies } from "./services/util.service";
import { languages } from "./services/util.service";

import { useTranslation } from "react-i18next";
import RadioButtons from "./components/radioButtons/radioButtons";

function App() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [calculatorInstances, setCalculatorInstances] = useState([1]);
  const [selectedPage, setSelectedPage] = useState("calculator");
  const [selectedCurrency, setSelectedCurrency] = useState("ils");
  const [rate, setRate] = useState(4);
  const [baseCurrency, setBaseCurrency] = useState("usd");
  const [selectedLanguage, setSelectedLanguage] = useState("he");
  const [selectedOption, setSelectedOption] = useState("amount");
  // useEffect(() => {
  //   Axios.get(
  //     `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}.json`
  //   ).then((res: any) => {
  //     const IlsUsdRate = res.data.usd.ils;
  //     setRate(IlsUsdRate);
  //   });
  // }, [baseCurrency]);

  const handleAddCalculator = () => {
    setCalculatorInstances([
      ...calculatorInstances,
      calculatorInstances.length + 1,
    ]);
  };

  const handleRemoveCalculator = (e: any, index: any) => {
    setCalculatorInstances((prevInstances) =>
      prevInstances.filter((_, i) => i !== index)
    );
  };
  const setPage = (page: any) => {
    setSelectedPage(page);
  };
  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue === "ils" || inputValue === "usd") {
      setSelectedCurrency(inputValue);
    } else {
      i18n.changeLanguage(inputValue);
      setSelectedLanguage(inputValue);
    }
  };

  const handleRadioButtonChange = (event: any) => {
    setCalculatorInstances([1]);
    setSelectedOption(event.target.value);
  };

  const dynamicInputClassName = ` ${"input-container currency-input"} ${
    selectedLanguage === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className="App">
      {/* <Header onSetPage={setPage} />
      {selectedPage == "about" && <About />} */}
      <h2>{t("title")}</h2>
      <div className="top-inputs">
        <div className={dynamicInputClassName}>
          <label htmlFor="currency">{t("currency")}</label>
          <Input
            type="dropdown"
            id="currency"
            options={currencies}
            onchange={handleChange}
            lang={selectedLanguage}
          />
        </div>
        <div className={dynamicInputClassName}>
          <label htmlFor="language">{t("lang")}</label>
          <Input
            type="dropdown"
            id="language"
            options={languages}
            onchange={handleChange}
            lang={selectedLanguage}
          />
        </div>
      </div>
      <RadioButtons
        key={selectedOption}
        language={selectedLanguage}
        handleRadioButtonChange={handleRadioButtonChange}
        selectedOption={selectedOption}
      />
      {selectedPage == "calculator" && (
        <div className="app-calculator">
          {calculatorInstances.map((instance, index) => (
            <Calculator
              key={instance}
              selectedOption={selectedOption}
              calculatorIndex={index}
              selectedCurrency={selectedCurrency}
              language={selectedLanguage}
              rate={rate}
              calculatorInstances={calculatorInstances}
              handleAddCalculator={handleAddCalculator}
              handleRemoveCalculator={(e: any) =>
                handleRemoveCalculator(e, index)
              }
            />
          ))}
        </div>
      )}
      {/* {selectedPage == "trades" && <Trades />}
      {selectedPage == "index" && <Index />} */}
    </div>
  );
}

export default App;
