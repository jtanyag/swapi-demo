// API with Star Wars character info
const url = 'https://swapi.co/api/people/';

// Declare variables where data will be saved
let charInfo;
let homeInfo;

// Declare variables where data will be displayed in HTML
let birthYear = document.querySelector('#birthYear');
let gender = document.querySelector('#gender');
let height = document.querySelector('#height');
let homeworld = document.querySelector('#homeworld');
let mass = document.querySelector('#mass');
let name = document.querySelector('#name');
let eyeColor = document.querySelector('#eye-color');
let hairColor = document.querySelector('#hair-color');

const updateInfo = charData => {
  birthYear.innerText = `Born: ${charData.birth_year}`;
  gender.innerText = `Gender: ${charData.gender}`;
  height.innerText = `Height (in cm): ${charData.height}`;
  mass.innerText = `Mass (in kg): ${charData.mass}`;
  name.innerText = charData.name;
  eyeColor.innerText = `Eye-color: ${charData.eye_color}`;
  hairColor.innerText = `Hair-color: ${charData.hair_color}`;
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

  // Character info fetched from endpoint
  fetch(endpoint).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => {
    console.log(jsonResponse);
    // Character data saved in variable declared earlier
    charInfo = jsonResponse;
    // Fetch homeworld data from endpoint in charInfo
    return fetch(charInfo.homeworld);
  }).then(response => {
    return response.json();
  }).then(homeworldJsonResponse => {
    // Homeworld data saved in variable declared earlier
    homeInfo = homeworldJsonResponse;
    // Fetch species data from endpoint in charInfo
    return fetch(charInfo.species[0]);
  }).then(response => {
    return response.json();
  }).then(speciesJsonResponse => {
    // Update all info together
    updateSpecies(speciesJsonResponse);
    updateHomeworld(homeInfo);
    updateInfo(charInfo);
  })
};

button.addEventListener('click', getCharacter);
