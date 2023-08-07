module.exports = {
  meta: {
    docs: {
      description: "自动添加可选链",
    },

    fixable: true,
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      MemberExpression(node) {
        const tokens = sourceCode.getTokens(node);
        const dotToken = tokens.at(-2);
        if (dotToken.value === "?.") {
          return;
        }
        context.report({
          node,
          loc: dotToken,
          message: "应该用可选链",
          fix: (fixer) => {
            return fixer.insertTextBefore(dotToken, "?");
          },
        });
      },
    };
  },
};
