const getClassMethodExpression = (t, classMethodsName) => {
  return t.memberExpression(t.thisExpression(), t.identifier(classMethodsName));
};

const ClassMethodParentPathVisitor = (t, classMethodName) => ({
  ClassMethod(path) {
    if (path.node.key.name === 'constructor') {
      path.get('body').pushContainer('body', t.expressionStatement(
        t.assignmentExpression(
          '=',
          getClassMethodExpression(t, classMethodName),
          t.callExpression(
            t.memberExpression(
              getClassMethodExpression(t, classMethodName),
              t.identifier("bind")
            ),
            [t.thisExpression()]
          )
        )
      ));
    } else {
      path.skip();
    }
  }
});

module.exports = ({ types: t }) => {
  const { RESERVED_CLASS_METHODS, LIFE_CYCLE_METHODS } = require('../constants').default;

  return {
    visitor: {
      ClassMethod(path) {
        if (!RESERVED_CLASS_METHODS.includes(path.node.key.name)
          && !(LIFE_CYCLE_METHODS.includes(path.node.key.name))) {
          
          const classMethodName = path.node.key.name;

            path.parentPath.traverse(ClassMethodParentPathVisitor(t, classMethodName));
        }
      }
    },
  };
};