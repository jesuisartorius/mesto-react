const Card = ({
                  card,
                  onCardClick,
                  onDeleteClick
              }) => {
    return (
        <>
            <li className="element">
                <button
                    className="element__delete-button"
                    aria-label="Delete button"
                    type="button"
                    onClick={() => onDeleteClick(card._id)}
                />
                <div
                    className="element__image"
                    style={{backgroundImage: `url(${card.link})`}}
                    onClick={() => onCardClick(card)}
                />
                <div className="element__flex">
                    <h2 className="element__text">{card.name}</h2>
                    <div className="element__like-wrapper">
                        <button type="button" className="element__like-button"/>
                        <p className="element__like-count">{card.likes.length}</p>
                    </div>
                </div>
            </li>
        </>
    );
};

export default Card;