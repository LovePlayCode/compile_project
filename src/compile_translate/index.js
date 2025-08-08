const TokenType = {
  PLUS: "+",
  MINUS: "-",
  A: "a",
  EOF: "EOF",
};

class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.currentChar = this.input[this.pos];
  }

  getNextToken() {
    if (this.pos >= this.input.length) {
      return { type: TokenType.EOF, value: null };
    }

    const char = this.input[this.pos++];
    switch (char) {
      case "+":
        return { type: TokenType.PLUS, value: "+" };
      case "-":
        return { type: TokenType.MINUS, value: "-" };
      case "a":
        return { type: TokenType.A, value: "a" };
      default:
        throw new Error(`非法字符: ${char}`);
    }
  }
}

// AST 节点类
class ASTNode {
  constructor(type) {
    this.type = type;
  }
}

class UnaryOpNode extends ASTNode {
  constructor(operator, child) {
    super("UnaryOp");
    this.operator = operator;
    this.child = child;
  }
}

class BinaryOpNode extends ASTNode {
  constructor(operator, left, right) {
    super("BinaryOp");
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class LiteralNode extends ASTNode {
  constructor(value) {
    super("Literal");
    this.value = value;
  }
}

class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = lexer.getNextToken();
  }

  error(expected) {
    throw new Error(`语法错误: 位置 ${this.lexer.pos} 应为 ${expected}`);
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      this.error(tokenType);
    }
  }

  // 解析 S → +SS | -SS | a
  parseS() {
    const token = this.currentToken;
    if (token.type === TokenType.PLUS || token.type === TokenType.MINUS) {
      const operator = token.value;
      this.eat(token.type); // 消耗运算符
      const left = this.parseS(); // 解析左子树
      const right = this.parseS(); // 解析右子树
      return new BinaryOpNode(operator, left, right); // 返回二元操作节点
    } else if (token.type === TokenType.A) {
      this.eat(TokenType.A); // 消耗 'a'
      return new LiteralNode("a"); // 返回字面量节点
    } else {
      this.error("'+', '-' 或 'a'");
    }
  }

  parse() {
    const ast = this.parseS();
    // 检查是否消耗全部输入
    if (this.currentToken.type !== TokenType.EOF) {
      throw new Error(`冗余符号: ${this.currentToken.value}`);
    }
    return ast;
  }
}

// 打印 AST 的辅助函数
function printAST(node, indent = 0) {
  const prefix = " ".repeat(indent);
  if (node instanceof BinaryOpNode) {
    console.log(`${prefix}BinaryOp: ${node.operator}`);
    console.log(`${prefix} 左子树 →`);
    printAST(node.left, indent + 4);
    console.log(`${prefix} 右子树 →`);
    printAST(node.right, indent + 4);
  } else if (node instanceof LiteralNode) {
    console.log(`${prefix}Literal: ${node.value}`);
  }
}

// 主程序
const input = "+a-aa"; // 输入表达式（无空格）
try {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const ast = parser.parse();
  console.log("解析成功！AST 结构：");
  printAST(ast);
} catch (error) {
  console.error(error.message);
}
