import "./percentCalculator.css";
import Input from "../styled/input";
import { useTranslation } from "react-i18next";

const PercentCalculator = (props) => {
  const { language, handleKeyPress, handleInput } = props;
  const { t } = useTranslation();

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
          //   value={commission}
          onkeypress={(e) => handleKeyPress("commission", e)}
          onchange={(e) => handleInput("commission", e)}
          maxlength="4"
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="stoploss">{t("stopLoss")}</label>
        <Input
          type="number"
          id="stoploss"
          //   value={stopLoss}
          onchange={(e) => handleInput("stoploss", e)}
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="profit">{t("profitTarget")}</label>
        <Input
          type="number"
          id="profit"
          // value={profit}
          onchange={(e) => handleInput("profit", e)}
          lang={props.language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="buyPrice">{t("buyPrice")}</label>
        <Input
          type="number"
          id="buyPrice"
          // value={checkIsFloat(buyPrice)}
          onkeypress={(e) => handleKeyPress("buyPrice", e)}
          onchange={(e) => handleInput("buyPrice", e)}
          // onfocus={clearInput}
          maxlength="7"
          lang={props.language}
        />
      </div>
    </div>
  );
};

export default PercentCalculator;
