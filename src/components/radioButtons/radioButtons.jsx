import Input from "../styled/input";
import "./radioButtons.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const RadioButtons = (props) => {
  const { language, selectedOption } = props;
  const { t } = useTranslation();

  const dynamicInputsClassName = ` ${"inputs-container flex-end buttons-container"} ${
    language === "en" ? "row-reverse" : ""
  }`;

  const dynamicInputClassName = ` ${"input-container"} ${
    language === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className={dynamicInputsClassName}>
      <div className={dynamicInputClassName}>
        <label htmlFor="percentTrade" className="text-align">
          {t("investmentAmount")}
        </label>
        <Input
          type="radio"
          id="percentTrade"
          value="amount"
          checked={selectedOption == "amount"}
          onchange={props.handleRadioButtonChange}
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="percentTrade" className="text-align">
          {t("stockPrice")}
        </label>
        <Input
          type="radio"
          id="amountTrade"
          value="price"
          checked={selectedOption == "price"}
          onchange={props.handleRadioButtonChange}
          lang={language}
        />
      </div>
    </div>
  );
};

export default RadioButtons;
