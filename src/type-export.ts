import * as ts from 'typescript';

const program = ts.createProgram(['targets/inferenced.ts'], {});

const checker = program.getTypeChecker();

const source = program.getSourceFile('targets/inferenced.ts');

ts.forEachChild(source, (node) => {
  console.log(node.kind);
  console.log(ts.SyntaxKind[node.kind]);
  const type = checker.getTypeAtLocation(node);
  console.log(type.isLiteral());
  console.log(type.getProperties());
})
