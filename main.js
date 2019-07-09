// TODO: Refactor (get character data, get homeworld data, get species data, update info last)

const url = 'https://swapi.co/api/people/';

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
    updateInfo(jsonResponse);

    fetch(jsonResponse.homeworld).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Homeworld request failed');
    }, networkError => {
      console.log(networkError.message);
    }).then(homeworldJsonResponse => {
      updateHomeworld(homeworldJsonResponse);
    });

    fetch(jsonResponse.species[0]).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Species request failed');
    }, networkError => {
      console.log(networkError.message);
    }).then(speciesJsonResponse => {
      updateSpecies(speciesJsonResponse);
    });
  })
};

button.addEventListener('click', getCharacter);
