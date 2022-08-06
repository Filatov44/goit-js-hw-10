import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  clearInfo();
  const newCountry = event.target.value.trim();
  console.log(newCountry);

  fetchCountries(newCountry)
    .then(country => {
      if (newCountry !== '') {
        if (country.length === 1) {
          createCountry(country);
        } else if (country.length >= 2 && country.length <= 10) {
          createListCountry(country);
        } else {
          errorMesage();
        }
      }
    })
    .catch(error => {
      console.error(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function createListCountry(country) {
  console.log('contryList', country);
  const element = country
    .map(({ flags, name }) => {
      return `<li class="country-item">
        <img
          class="country-item-flag"
          src="${flags.svg}"
          alt="flag"
          width="40px"
        />
        <span class="country-item-name">${name.common}</span>
      </li>`;
    })
    .join('');
  refs.countryListEl.innerHTML = element;
}

function createCountry(country) {
  console.log(country);
  const element = country
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class="country-info">
      <div class="country-info-basic">
        <img class="country-info-flags" src="${flags.svg}" alt="${
        name.official
      }" width="50px" />
        <h2 class="country-info-name">${name.official}</h2>
      </div>
      <p class="country-info-capital"><span class="country-info-basic">Capital:</span> ${capital}</p>
      <p class="country-info-population"><span class="country-info-basic">Population:</span> ${population}</p>
      <p class="country-info-languages"><span class="country-info-basic">Languages:</span> ${Object.values(
        languages
      )}</p>
    </div>`;
    })
    .join('');
  refs.countryInfoEl.innerHTML = element;
}

function errorMesage() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function clearInfo() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}
