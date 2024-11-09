/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i=0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null; 

      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        this.chains[word] = [nextWord];
      }
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let text = [];

    while (text.length < numWords && key !== null) {
      text.push(key);
      const nextWords = this.chains[key];
      key = nextWords[Math.floor(Math.random() * nextWords.length)];
    }
    return text.join(" ");
  }
}

module.exports = {MarkovMachine};
