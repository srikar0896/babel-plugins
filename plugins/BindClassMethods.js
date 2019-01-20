module.exports = ({ types: t }) => {
  const RESERVED_CLASS_METHODS = ['constructor', 'render'];

  return {
    visitor: {
      ClassMethod(path) {
        if (!RESERVED_CLASS_METHODS.includes(path.node.key.name)) {
          const classMethodName = path.node.key.name;
          path.parentPath.traverse({
            ClassMethod(path) {              
              if (path.node.key.name === 'constructor') {
                path.get('body').pushContainer('body', t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.memberExpression(t.thisExpression(), t.identifier(classMethodName)),
                    t.callExpression(
                      t.memberExpression(
                        t.memberExpression(
                          t.thisExpression(),
                          t.identifier(classMethodName)
                        ),
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
        }
      }
    },
  };
};