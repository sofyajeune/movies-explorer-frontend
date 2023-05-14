import checkmark from "../../images/checkmark.svg";
import cross from "../../images/cross.svg";
import "./InfoToolTip.css";
export default function InfoTooltip(props) {

  const { onClose, isOpen, registerResponse } = props;

  return (
    <section className={`popup popup_type_infotooltip ${isOpen && 'popup_opened'}`}>
      <figure className="popup__container">
        <button onClick={onClose} className="popup__close-button" type="button" />
        <img src={registerResponse.status ? checkmark : cross} alt="Регистрация успешна" className="popup__icon" />
        <figcaption className="popup__icon-caption">{registerResponse.text}</figcaption>
      </figure>
    </section>
  );
};