function createInfiniteCarousel(wrapperSelector, carouselSelector, numbersId, numberId) {
    const wrappers = document.querySelectorAll(wrapperSelector);

    wrappers.forEach(wrapper => {
        const carousel = wrapper.querySelector(carouselSelector);
        const arrowBtns = wrapper.querySelectorAll(`i`);
        const carouselChildrens = [...carousel.children];
        const cardNumbers = document.getElementById(numbersId);
        const cardNumber = document.getElementById(numberId);
        let isDragging = false, startX, startScrollLeft;
        let timeoutId;

        // Расчет карточек на вид и создание бесконечной прокрутки:
        let cardPerView = Math.round(carousel.offsetWidth / carouselChildrens[0].offsetWidth);

        // Присваивание свойства index каждой карточке
        carouselChildrens.forEach((card, index) => {
            card.index = index;
        });

        // Копирование карточек для бесконечной прокрутки
        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Установка начальной позиции прокрутки для бесконечной прокрутки
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        // Добавление обработчиков событий для кнопок-стрелок:
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id == "left" ? -carouselChildrens[0].offsetWidth : carouselChildrens[0].offsetWidth;
                updateCardNumbers();
            });
        });

        function dragStart(e) {
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        function dragging(e) {
            if (!isDragging) return;
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        function dragStop() {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        // Функция обновления информации о текущем слайде
        const updateCardNumbers = () => {
            const totalCards = carouselChildrens.length; 
            const currentSlideIndex = getActiveSlideIndex();

            cardNumbers.textContent = totalCards;
            cardNumber.textContent = currentSlideIndex + 1; // индексация с 1, а не с 0
        };

        // Функция получения индекса активного слайда
        const getActiveSlideIndex = () => {
            return Math.round(carousel.scrollLeft / carouselChildrens[0].offsetWidth) % carouselChildrens.length;
        };

        function infiniteScroll() {
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (3 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }
            updateCardNumbers();
            clearTimeout(timeoutId);
            if (!wrapper.matches(":hover")) /* autoPlay() */;
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));

        window.addEventListener("resize", () => {
            cardPerView = Math.round(carousel.offsetWidth / carouselChildrens[0].offsetWidth);
            updateCardNumbers();
        });

        updateCardNumbers();
    });
}

// Использование функции для создания карусели для всех элементов с классом "wrapper"
createInfiniteCarousel(".wrapper", ".carousel", "numbers", "number");
