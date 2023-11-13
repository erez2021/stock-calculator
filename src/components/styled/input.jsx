import StyledInput from "../../styles/input";
import { useTranslation } from "react-i18next";

const Input = (props) => {
  const { t } = useTranslation();
  const {
    type,
    options,
    id,
    onchange,
    onkeypress,
    maxlength,
    value,
    onfocus,
    lang,
  } = props;
  if (type === "dropdown") {
    return (
      <StyledInput as="select" onChange={onchange} value={value} lang={lang}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {id === "profit" || id === "stoploss"
              ? t(option.label) + "%"
              : id === "leverage"
              ? t(option.label) + "X"
              : t(option.label)}
          </option>
        ))}
      </StyledInput>
    );
  } else {
    return (
      <StyledInput
        onChange={onchange}
        onKeyDown={onkeypress}
        maxLength={maxlength}
        value={value}
        onFocus={onfocus}
        lang={lang}
      />
    );
  }
};

export default Input;
