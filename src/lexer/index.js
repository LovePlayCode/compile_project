class Token {
  tag = "";
  constructor(t) {
    tag = t;
  }
}
class Tag {
  static NUM = 256;
  static ID = 257;
  static TRUE = 258;
  static FALSE = 259;
}

class Num extends Token {
  value = "";
  constructor(v) {
    super(Tag.Num);
    this.value = v;
  }
}

class Word extends Token {
  lexeme = "";
  constructor(t, s) {
    super(t);
    this.lexeme = s + "";
  }
}

class Lexer {
  line = 1;
  peek = "";
  words = new Map();
  initStr = "";
  reserve(t) {
    this.words.set(t.lexeme, t);
  }
  constructor(str) {
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
    this.initStr = str;
  }
  scan() {
    const formatStr = this.initStr.split();
    for (; (this.peek = formatStr.shift()); ) {
      if (this.peek === " " || this.peek === "\t") {
        continue;
      } else if (this.peek === "\n") {
        this.line = this.line + 1;
      } else break;
    }
    if (/^[0-9]$/.test(this.peek)) {
      let v = 0;
      do {
        v = 10 * v + Number(this.peek);
        this.peek = this.initStr.shift();
      } while (/^[0-9]$/.test(this.peek));
      return new Num(v);
    }
    if (/^[a-zA-Z]$/.test(this.peek)) {
      let lexeme = "";
      do {
        lexeme += this.peek;
        this.peek = this.initStr.shift();
      } while (/^[a-zA-Z]$/.test(this.peek));
      const word = this.words.get(lexeme);
      if (word !== null) {
        return word;
      }
      const resWord = new Word(Tag.ID, lexeme);
      this.words.set(lexeme, resWord);
      return resWord;
    }
    const t = new Token(this.peek);
    this.peek = "";
    return t;
  }
}
