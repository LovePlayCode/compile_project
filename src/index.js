// 主入口文件 - 演示中缀表达式转后缀表达式程序

const {
  Lexer,
  Parser,
  ASTNode,
  SemanticActions,
  Main,
} = require("./compile_translate/将中缀表达式转换为后缀表达式.js");

// 运行主程序
console.log("🚀 启动中缀表达式转后缀表达式程序...\n");
Main.main();

// 额外的演示函数
function demonstrateCustomExpression(expression) {
  console.log(`\n📝 自定义表达式演示: ${expression}`);

  try {
    // 词法分析
    const lexer = new Lexer(expression);
    const tokens = lexer.tokenize();
    console.log(
      `🔍 词法分析:`,
      tokens.map((t) => `${t.type}(${t.value})`).join(" ")
    );

    // 语法分析
    const parser = new Parser(tokens);
    const ast = parser.parse();
    console.log(`🌳 语法树构建完成`);

    // 语义动作
    const semanticActions = new SemanticActions();
    semanticActions.visit(ast);
    const postfix = semanticActions.getPostfix();

    console.log(`📤 后缀表达式: ${postfix}`);
    console.log(`🧮 计算结果: ${Main.evaluatePostfix(postfix)}`);
  } catch (error) {
    console.error(`❌ 错误: ${error.message}`);
  }
}

// 演示一些自定义表达式
console.log("\n" + "=".repeat(60));
console.log("🎯 自定义表达式演示");
console.log("=".repeat(60));

demonstrateCustomExpression("15 + 3 * 4 - 2");
demonstrateCustomExpression("(10 + 5) * (3 - 1)");
demonstrateCustomExpression("8 / 2 + 3 * 4");

console.log("\n✅ 程序执行完成！");
