import { useState } from "react";

// Interface of types for TSX functionalitet

interface Data {
  word: string;
  meanings: Array<Meaning>;
  phonetic: string;
  sourceUrls: Array<string>;
  phonetics: Array<Phonetics>;
}

type Meaning = {
  antonym: Array<string>;
  partOfSpeech: string;
  synonyms: Array<string>;
  definitions: Array<Definition>;
};

type Definition = {
  definition: string;
  antonyms: Array<string>;
  synonyms: Array<string>;
};

type Phonetics = {
  audio: string;
  text: string;
  sourceUrl: string;
  license: License;
};

type License = {
  name: string;
  url: string;
};

//API nyckel för sökningar på ord
const API_KEY = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function Search() {

    // State some sparar det som behövs för användaren
  const [inputValue, setInputValue] = useState("");
  const [orderedData, setOrderedData] = useState({
    word: "",
    sound: "",
    src: "",
    definitions: [""],
    mp3: "",
  });

  async function searchWord() {
    // startar sökningen
    if (inputValue != "") {
      const word: string = inputValue;
      const response = await fetch(API_KEY + word);
      const data = await response.json();

      orderResult(data[0]);
    } 
    // visar för användaren att de inte har skrivit in ett ord
    else setOrderedData({
        word: "ERROR",
        sound: "no word detected",
        src: "",
        definitions: [""],
        mp3: "",
      });
  }

  function orderResult(data: Data) {

    // ordnar informationen från APIet
    console.log("ordering")
    const searchedWord = data.word;

    const phonetic = data.phonetic;

    const source = data.sourceUrls[0];

    const meaning = data.meanings[0].definitions;

    const meanings = [];
    for (let i = 0; i < meaning.length; i++) {
      const mapping = meaning[i].definition;
      meanings.push(mapping);
    }

    const audio = data.phonetics[0].audio;

    // sparar den viktiga informationen i användbart format
    setOrderedData({
      word: searchedWord,
      sound: phonetic,
      src: source,
      definitions: meanings,
      mp3: audio,
    });
  }

  // HTML som visas för användaren
  return (
    <article>
      <input
        type="string"
        id="Search"
        placeholder="Search Word"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={searchWord}>Search for word</button>
      <article id="results" className="results">
        <h2>Results</h2>
        <h3>{orderedData.word}</h3>
        <p>{orderedData.sound}</p>
        <audio controls src={orderedData.mp3} />
        <ul id="list">
            <li>{orderedData.definitions[0]}</li>
            <li>{orderedData.definitions[1]}</li>
            <li>{orderedData.definitions[2]}</li>
            <li>{orderedData.definitions[3]}</li>
            <li>{orderedData.definitions[4]}</li>
            <li>{orderedData.definitions[5]}</li>
        </ul>
        <a>{orderedData.src}</a>
      </article>
    </article>
  );
}

export default Search;
