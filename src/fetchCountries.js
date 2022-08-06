export function fetchCountries(name) {
  const parametersRequest = 'name,capital,population,flags,language';
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=${parametersRequest}`;
  return fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      Notify.failure('Ловим ошибку в fetch');
    });
}
