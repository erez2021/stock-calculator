import Input from "../styled/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const RadioButtons = (props) => {
  const { language, selectedOption } = props;
  console.log("selectedOption", selectedOption);
  const { t } = useTranslation();

  const dynamicInputsClassName = ` ${"inputs-container flex-end"} ${
    language === "en" ? "row-reverse" : ""
  }`;

  const dynamicInputClassName = ` ${"input-container"} ${
    language === "en" ? "text-align-left" : ""
  }`;

  return (
    <div className={dynamicInputsClassName}>
      <div className={dynamicInputClassName}>
        <label htmlFor="percentTrade">{t("option1")}</label>
        <Input
          type="radio"
          id="percentTrade"
          value="option1"
          checked={selectedOption == "option1"}
          onchange={props.handleRadioButtonChange}
          lang={language}
        />
      </div>
      <div className={dynamicInputClassName}>
        <label htmlFor="percentTrade">{t("option2")}</label>
        <Input
          type="radio"
          id="amountTrade"
          value="option2"
          checked={selectedOption == "option2"}
          onchange={props.handleRadioButtonChange}
          lang={language}
        />
      </div>
    </div>
  );
};

export default RadioButtons;
