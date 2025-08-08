// 根据语法分析树 + 语义动作 实现解析中缀表达式的程序

class Parser {
  curStr = "";
  constructor(str) {
    this.curStr = str;
  }
  expr() {
    this.term(this.curStr[0]);
    for (let i = 1; i < this.curStr.length; i++) {
      while (true) {
        if (this.curStr[i] === "+") {
          this.term(this.curStr[i + 1]);
          i = i + 1;
          console.log("+");
        } else if (this.curStr[i] === "-") {
          this.term(this.curStr[i + 1]);
          i = i + 1;
          console.log("-");
        } else {
          break;
        }
      }
    }
  }
  term(str) {
    // 判断 str 是否是一个 0-9的数字
    if (/^[0-9]$/.test(str)) {
      console.log(str);
    } else {
      // 不是数字
      throw new Error("str Error");
    }
  }
}

class Main {
  main() {
    new Parser("9-5+2").expr();
  }
}

const main = new Main();
main.main();
