import {useEffect, useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Loader from "./Loader/Loader";


function App() {
    // Context for current user
    const [currentUser, setCurrentUser] = useState({
        name: "",
        about: "",
        avatar: "",
    });

    const [cards, setCards] = useState([]);
    // Loader state
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


    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === "Escape") {
                closeAllPopups();
            }
        };
        document.addEventListener("keydown", closeByEscape);
        return () => {
            document.removeEventListener("keydown", closeByEscape);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        api.getAppInfo().then(([userData, cards]) => {
            setCurrentUser(userData);
            setCards(cards);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.error(err));
    }

    const handleCardDelete = (card) => {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateUser = ({name, about}) => {
        api
            .setUserInfo({name, about})
            .then((userData) => {
                setCurrentUser({name, about, ...userData});
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleUpdateAvatar = (avatar) => {
        api
            .setUserAvatar(avatar)
            .then((userData) => {
                setCurrentUser({avatar, ...userData});
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };

    const handleAddPlaceSubmit = ({name, link}) => {
        api
            .addCard({name, link})
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    };


    return (
        <CurrentUserContext.Provider value={currentUser}>
            {isLoading ? <Loader/> : <Header/>}
            <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

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
            <Footer/>
        </CurrentUserContext.Provider>
    );
}

export default App;