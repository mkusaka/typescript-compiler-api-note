import * as ts from "typescript";

export function astFactory(message: any) {
  return [
    ts.createExpressionStatement(ts.createCall(
      ts.createPropertyAccess(
        ts.createIdentifier("console"),
        ts.createIdentifier("log")
      ),
      undefined,
      [
        ts.createLiteral(message),
        ts.createIdentifier("string")
      ]
    ))
  ];
}

export function astWithTypeFactory(message: string) {
  return [
    ts.createVariableStatement(
      undefined,
      ts.createVariableDeclarationList(
        [ts.createVariableDeclaration(
          ts.createIdentifier("hoge"),
          ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          ts.createStringLiteral("hello world")
        )],
        ts.NodeFlags.Const
      )
    )
  ];
}

const printer = ts.createPrinter();

function main(message: string) {
  const print = printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray(astFactory(message)),
    ts.createSourceFile("", "", ts.ScriptTarget.ES2015)
  );
  console.log(print)
}

main(process.argv[2].slice(0))
