import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import Loader from "./Loader/Loader";

function App() {
    const [isLoading, setIsLoading] = useState(false);


    // Popup States
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

    const [isPreviewImagePopupOpen, setIsPreviewImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleDeleteClick = () => setIsConfirmDeletePopupOpen(true);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsPreviewImagePopupOpen(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setIsPreviewImagePopupOpen(false);
    };

    // User State
    const [user, setUser] = useState({
        name: "",
        about: "",
        avatar: "",
    });

    const [cards, setCards] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        api.getAppInfo().then(([userData, cards]) => {
            setUser(userData);
            setCards(cards);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? <Loader/> : <Header />}
            <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                cards={cards}
                user={user}
            />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                name="profile-avatar"
                title="Обновить аватар"
                buttonText="Сохранить"
            >
                <label className="popup__form-field">
                    <input
                        type="url"
                        name="avatar"
                        className="popup__input popup__input_type_image-link"
                        placeholder="Ссылка на фотографию"
                        id="avatar-input"
                        required
                    />
                    <span className="popup__input-error avatar-input-error" />
                </label>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                name="add-card"
                title="Новое место"
                buttonText="Создать"
            >
                <label className="popup__form-field">
                    <input
                        type="text"
                        name="name"
                        className="popup__input popup__input_type_title"
                        placeholder="Название"
                        required
                        minLength="1"
                        maxLength="30"
                        id="title-input"
                    />
                    <span className="popup__input-error title-input-error" />
                </label>

                <label className="popup__form-field">
                    <input
                        type="url"
                        name="link"
                        className="popup__input popup__input_type_image-link"
                        placeholder="Ссылка на изображение"
                        required
                        id="url-input"
                    />
                    <span className="popup__input-error url-input-error" />
                </label>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                name="edit-profile"
                title="Редактировать профиль"
                buttonText="Сохранить"
            >
                <label className="popup__form-field">
                    <input
                        type="text"
                        name="name"
                        className="popup__input popup__input_type_name"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        id="name-input"
                        required
                    />
                    <span className="popup__input-error name-input-error" />
                </label>
                <label className="popup__form-field">
                    <input
                        type="text"
                        name="about"
                        className="popup__input popup__input_type_job"
                        placeholder="Описание"
                        minLength="2"
                        maxLength="200"
                        id="job-input"
                        required
                    />
                    <span className="popup__input-error job-input-error" />
                </label>
            </PopupWithForm>

            <PopupWithForm
                name="confirm"
                isOpen={isConfirmDeletePopupOpen}
                onClose={closeAllPopups}
                title="Вы Уверены?"
                buttonText="Да"
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isPreviewImagePopupOpen}
                name="preview"
            />
            <Footer />
        </>
    );
}

export default App;