import "./Burger.css";
import close from "../../images/close.svg"
import NavTabBurger from "../NavTabBurger/NavTabBurger";

function Burger({isOpen, onClose}) {
  
  const className = isOpen
    ? "burger burger_active"
    : "burger";

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <section className={className}>
      <div className="burger__container">
        <button className="burger__button" onClick={onClose}>
          <img src={close} alt="Выход из бургер меню" />
        </button>
        <NavTabBurger isOpen={isOpen} onClose={onClose}/>
      </div>
    </section>
  );
}

export default Burger;