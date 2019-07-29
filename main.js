const url = 'https://swapi.co/api/people/';

let charInfo;
let homeInfo;
let birthYear = document.querySelector('#birthYear');
let gender = document.querySelector('#gender');
let height = document.querySelector('#height');
let homeworld = document.querySelector('#homeworld');
let mass = document.querySelector('#mass');
let name = document.querySelector('#name');

const updateInfo = charData => {
  birthYear.innerText = `Born: ${charData.birth_year}`;
  gender.innerText = `Gender: ${charData.gender}`;
  height.innerText = `Height (in cm): ${charData.height}`;
  mass.innerText = `Mass (in kg): ${charData.mass}`;
  name.innerText = charData.name;
}

const updateHomeworld = homeData => {
  homeworld.innerText = `Homeworld: ${homeData.name}`;
}

const updateSpecies = speciesData => {
  species.innerText = `Species: ${speciesData.name}`;
}

const getCharacter = () => {
  let num = Math.floor((Math.random() * 88) + 1);
  const endpoint = `${url}${num}`;

  fetch(endpoint).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => {
    console.log(jsonResponse);
    charInfo = jsonResponse;
    return fetch(charInfo.homeworld);
  }).then(response => {
    return response.json();
  }).then(homeworldJsonResponse => {
    homeInfo = homeworldJsonResponse;
    return fetch(charInfo.species[0]);
  }).then(response => {
    return response.json();
  }).then(speciesJsonResponse => {
    updateSpecies(speciesJsonResponse);
    updateHomeworld(homeInfo);
    updateInfo(charInfo);
  })
};

button.addEventListener('click', getCharacter);
