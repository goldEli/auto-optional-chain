const { ESLint } = require("eslint");

const engine = new ESLint({
  fix: true,
  overrideConfig: {
    parser: "@babel/eslint-parser",
    rules: {
      semi: ["error", "never"],
      "auto-optional-chain": ["error"],
    },
  },
  rulePaths: [__dirname],
  useEslintrc: false,
});

async function main() {
  const results = await engine.lintText(`
        function handleRes(data) {
            const res = data.a.b.c + data.e.f.g;

        }
    `);
  console.log(results[0].output);
  /**
   * 美化输出结果
   */
  const formatter = await engine.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);
}
main();
