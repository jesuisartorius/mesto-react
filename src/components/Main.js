import Card from "./Card";

const Main = ({
                  onEditProfileClick,
                  onAddPlaceClick,
                  onEditAvatarClick,
                  onCardClick,
                  onConfirmDeleteClick,
                  user,
                  cards,
              }) => {
    return (
        <main>
            <section className="profile">
                <div>
                    <div
                        className="profile__avatar-overlay"
                        onClick={onEditAvatarClick}
                    />
                    <img
                        src={user.avatar}
                        alt="old person with a red hat smiling to camera"
                        className="profile__avatar"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button
                        className="profile__edit-button"
                        aria-label="edit button"
                        type="button"
                        onClick={onEditProfileClick}
                    />
                    <p className="profile__job">{user.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    aria-label="Add button"
                    type="button"
                    onClick={onAddPlaceClick}
                />
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onConfirmDeleteClick={onConfirmDeleteClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main;