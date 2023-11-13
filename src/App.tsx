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

function App() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [calculatorInstances, setCalculatorInstances] = useState([1]);
  const [selectedPage, setSelectedPage] = useState("calculator");
  const [selectedCurrency, setSelectedCurrency] = useState("ils");
  const [rate, setRate] = useState(4);
  const [baseCurrency, setBaseCurrency] = useState("usd");
  const [selectedLanguage, setSelectedLanguage] = useState("he");

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
      console.log(inputValue);

      i18n.changeLanguage(inputValue);
      setSelectedLanguage(inputValue);
    }
  };

  const dynamicInputClassName = ` ${"input-container currency-input"} ${
    selectedLanguage === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className="App">
      {/* <Header onSetPage={setPage} />
      {selectedPage == "about" && <About />} */}
      <h2 style={{ color: "white" }}>{t("title")}</h2>
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
      {selectedPage == "calculator" && (
        <div className="app-calculator">
          {calculatorInstances.map((instance, index) => (
            <Calculator
              key={instance}
              calculatorIndex={index}
              selectedCurrency={selectedCurrency}
              language={selectedLanguage}
              rate={rate}
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
