const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger_active');
  nav.classList.toggle('nav_active');
  document.querySelector('body').classList.toggle('no-scroll');

  nav.addEventListener('click', ({target}) => {
    console.log('target: ', target);
    if (target.classList.contains('nav__link')) {
      burger.classList.remove('burger_active');
      nav.classList.remove('nav_active');
      document.querySelector('body').classList.remove('no-scroll');
    }
  })
});



// form choice
const sliderElSumm = document.querySelector(".choice__range_summ");
const sliderValueSumm = document.querySelector("#choiseSummValue");
const sliderElDays = document.querySelector(".choice__range_days");
const sliderValueDays = document.querySelector("#choiseDaysValue");

sliderElSumm.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  sliderValueSumm.textContent = `${Intl.NumberFormat('ru-RU').format(tempSliderValue)} ₽`;
  const progress = (tempSliderValue / sliderElSumm.max) * 100;
  sliderElSumm.style.background = `linear-gradient(to right, #FF7347 ${progress}%, #ececec ${progress}%)`;
});

sliderElDays.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  sliderValueDays.textContent = `${tempSliderValue} дн.`;
  const progress = (tempSliderValue / sliderElDays.max) * 100;
  sliderElDays.style.background = `linear-gradient(to right, #FF7347 ${progress}%, #ececec ${progress}%)`;
});


// faq
const items = document.querySelectorAll('.faq__item');
const textWrappers = document.querySelectorAll('.faq__item-text-wrapper');

let heightWrapper = 0;
textWrappers.forEach(elem => {
  if (heightWrapper < elem.scrollHeight) {
    heightWrapper = elem.scrollHeight;
  }
});

items.forEach(item => {
  item.addEventListener('click', () => {
    const textWrapper = item.querySelector('.faq__item-text-wrapper');

    if (textWrapper.style.height === '') {
      items.forEach(i => {
        i.classList.remove('faq__item_active');
        textWrappers.forEach(tw => {
          tw.style.height = '';
        });
      });
      textWrapper.style.height =
        item.classList.contains('faq__item_active') ?
        '' : `${heightWrapper}px`;
      item.classList.add('faq__item_active');
    } else {
      textWrapper.style.height = '';
      item.classList.remove('faq__item_active');
    }
  });
});

// more
const categoryEnum = document.querySelectorAll('.category__enum');
const moreBtns = [];

for (let i = 0; i < categoryEnum.length; i++) {
  const lists = categoryEnum[i].querySelectorAll('.category__enum-item');

  for (let j = 0; j < lists.length; j++) {
    if (j > 5) {
      lists[j].style.display = 'none';
    }
  }
  
  if (lists.length > 6) {
    const more = document.createElement('button');
    more.classList.add('more-btn', 'category__link', 'link');

    more.innerHTML = `Показать еще 
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.46216 4.81148L7.8049 1.49197C7.93498 1.36972 8 1.21707 8 1.03371C8 0.850346 7.93491 0.697693 7.8049 0.575446L7.41974 0.188498C7.29307 0.0628802 7.1391 7.12562e-05 6.95767 7.12482e-05C6.77967 7.12404e-05 6.62387 0.0628624 6.4904 0.188498L3.99998 2.66292L1.50444 0.188391C1.37777 0.0628087 1.2238 -2.98254e-07 1.04235 -3.06241e-07C0.864372 -3.14074e-07 0.708515 0.0627908 0.575103 0.188391L0.189993 0.575374C0.0633255 0.700974 8.45691e-07 0.853788 8.37884e-07 1.03364C8.30073e-07 1.21356 0.0633255 1.36634 0.189993 1.4919L3.53273 4.81148C3.66624 4.93714 3.822 5 4 5C4.18143 5.00002 4.33549 4.93714 4.46216 4.81148Z" fill="currentColor"/>
      </svg>
    `;
    categoryEnum[i].insertAdjacentElement('afterend', more);
    moreBtns.push(more);
  }
};

moreBtns.forEach(element => {
  element.addEventListener('click', event => {
  const previousElement = event.target.previousElementSibling;
  if(previousElement) {
    previousElement.querySelectorAll('li').forEach(li => {
      if (li.style.display === 'none') li.style.display = 'block';
      element.remove();
    });
  }
})});

// modal with company info
const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({top: scrollController.scrollPosition})
    document.documentElement.style.scrollBehavior = '';
  },
};

const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal',
  btnOpen: '.card__btn-info',
  btnClose: '.modal__close',
});