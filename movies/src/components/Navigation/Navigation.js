import "./Navigation.css"
import NavTabBurger from "../NavTabBurger/NavTabBurger";
import burgerbutton from "../../images/burgerbutton.svg"

function Navigation({ onOpenBurger }) {
    return (
        <>
            <NavTabBurger />
            <button className="header__burger" onClick={onOpenBurger}>
                <img className="header__image" src={burgerbutton} alt="Кнопка бургер меню" />
            </button>
        </>
    );
}

export default Navigation;
