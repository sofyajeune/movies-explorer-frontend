import "./EmptyPage.css";

function EmptyPage({ text, className, onClick }) {
    return (
        <>
            <h3 className="emptypage">{text}</h3>
            <button
                className={className}
                aria-label="Перейти ко всем фильмам"
                type="button"
                onClick={onClick}
            >
                Все фильмы{" "}
            </button>
        </>
    );
}

export default EmptyPage;
