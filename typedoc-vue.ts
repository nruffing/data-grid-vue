import { Application, DeclarationReflection, Converter, Context, ReflectionKind, ReflectionFlag, ReflectionType } from 'typedoc'
import type { Identifier, ImportTypeNode, LiteralType, TypeLiteralNode } from 'typescript'
import pkg from 'typescript'
const { SyntaxKind } = pkg

export function load(app: Application) {
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context: Context, reflection: DeclarationReflection) => {
    // get the DefineComponent declaration
    const declarations = reflection.project.getSymbolFromReflection(reflection)?.getDeclarations()
    if (!declarations?.length) {
      return
    }

    const declaration = declarations?.find(d => d.kind === SyntaxKind.VariableDeclaration && context.getSymbolAtLocation(d)?.name === '_default')
    if (!declaration) {
      return
    }

    // get ImportType
    const importType = declaration.getChildren()?.find(n => n.kind === SyntaxKind.ImportType) as ImportTypeNode | undefined
    if (!importType) {
      return
    }

    // verify this is a DefineComponent declaration
    const identifier = importType.qualifier as Identifier | undefined
    if (identifier?.escapedText !== 'DefineComponent') {
      return
    }

    // get first TypeLiteral child, this is the props type
    const propsTypeLiteral = importType.typeArguments?.find(a => a.kind === SyntaxKind.TypeLiteral) as TypeLiteralNode | undefined
    if (!propsTypeLiteral) {
      return
    }

    // document vue component as modules instead of constants
    reflection.setFlag(ReflectionFlag.Const, false)
    reflection.kind = ReflectionKind.Module

    // set the properties of the props type as children of the the now module declaration
    const scope = context.withScope(reflection)
    const someType = context.converter.convertType(scope, propsTypeLiteral) as ReflectionType

    if (!reflection.children) {
      reflection.children = []
    }

    for (const prop of someType?.declaration?.children ?? []) {
      reflection.children.push(prop)
      prop.parent = reflection
    }
  })
}
