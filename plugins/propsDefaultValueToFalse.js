module.exports = ({ types: t }) => {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === 'foo') {
          path.node.name = 'bar';
        }
      },
      JSXAttribute(path, state) {
        if (path.node.value !== null) return;
        path.node.value = t.JSXExpressionContainer(t.BooleanLiteral(false));
      },
    },
  };
};