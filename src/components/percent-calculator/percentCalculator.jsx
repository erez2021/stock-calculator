import "./percentCalculator.css";
import Input from "../styled/input";
import { useTranslation } from "react-i18next";

const PercentCalculator = (props) => {
  const { language, handleKeyPress, handleInput, tradeData } = props;
  const { t } = useTranslation();
  const { commission, stopLossPrice, sellingPrice, buyPrice, sharesNumber } =
    tradeData;
  const dynamicInputsClassName = ` ${"inputs-container"} ${
    language === "en" ? "row-reverse" : ""
  }`;

  const dynamicInputClassName = ` ${"input-container"} ${
    language === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className={dynamicInputsClassName}>
      <div className={dynamicInputClassName}>
        <label htmlFor="buyPrice">{t("commission")}</label>
        <Input
          type="number"
          id="commission"
          value={commission}
          onkeypress={(e) => handleKeyPress("commission", e)}
          onchange={(e) => handleInput("commission", e)}
          maxlength="4"
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="stopLossPrice">{t("stopLossPrice")}</label>
        <Input
          type="number"
          id="stopLossPrice"
          value={stopLossPrice}
          onchange={(e) => handleInput("stopLossPrice", e)}
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="sellingPrice">{t("sellingPrice")}</label>
        <Input
          type="number"
          id="sellingPrice"
          value={sellingPrice}
          onchange={(e) => handleInput("sellingPrice", e)}
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="buyPrice">{t("buyPrice")}</label>
        <Input
          type="number"
          id="buyPrice"
          value={buyPrice}
          onkeypress={(e) => handleKeyPress("buyPrice", e)}
          onchange={(e) => handleInput("buyPrice", e)}
          // onfocus={clearInput}
          maxlength="7"
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="sharesNumber">{t("sharesNumber")}</label>
        <Input
          type="number"
          id="sharesNumber"
          value={sharesNumber}
          onkeypress={(e) => handleKeyPress("sharesNumber", e)}
          onchange={(e) => handleInput("sharesNumber", e)}
          // onfocus={clearInput}
          maxlength="7"
          lang={language}
        />
      </div>
    </div>
  );
};

export default PercentCalculator;
