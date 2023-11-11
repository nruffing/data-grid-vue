import {
  Application,
  DeclarationReflection,
  Converter,
  Context,
  ReflectionKind,
  ReflectionFlag,
  ReflectionType,
  Comment,
  CommentTag,
  type SomeType,
  IntrinsicType,
  SignatureReflection,
} from 'typedoc'
import type { Identifier, ImportTypeNode, TypeLiteralNode, TypeReferenceNode } from 'typescript'
import pkg from 'typescript'
//import { ValidOperatorsMap } from './vuepress/node_modules/data-grid-vue/lib/main'

const { SyntaxKind } = pkg

export function load(app: Application) {
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context: Context, reflection: DeclarationReflection) => {
    // get the DefineComponent declaration
    const declarations = reflection.project.getSymbolFromReflection(reflection)?.getDeclarations()
    if (!declarations?.length) {
      return
    }

    const declaration = declarations?.find(d => d.kind === SyntaxKind.VariableDeclaration)
    if (!declaration) {
      return
    }

    const symbol = context.getSymbolAtLocation(declaration)
    if (!symbol) {
      return
    }

    switch (symbol.name) {
      case '_default':
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

        processDefineComponent({ importType, context, reflection })
        return

      // case 'ValidOperatorsMap':
      //   console.log(symbol)
      //   console.log(declaration)
      //   console.log(declaration.getSourceFile())
    }
  })
}

interface DefineComponentContext {
  importType: ImportTypeNode
  context: Context
  reflection: DeclarationReflection
}

function processDefineComponent(context: DefineComponentContext) {
  // document vue component as module instead of constants
  context.reflection.setFlag(ReflectionFlag.Const, false)
  context.reflection.kind = ReflectionKind.Module

  processProps(context)
  processSlots(context)
  processEmits(context)
}

function processProps(context: DefineComponentContext) {
  // get first TypeLiteral child, this is the props type
  const propsTypeLiteral = context.importType.typeArguments?.find(a => a.kind === SyntaxKind.TypeLiteral) as TypeLiteralNode | undefined
  if (!propsTypeLiteral) {
    return
  }

  processTypeLiteral(propsTypeLiteral, context, 'props')
}

function processSlots(context: DefineComponentContext) {
  const typeReference = context.importType.typeArguments?.find(a => {
    if (a.kind === SyntaxKind.TypeReference) {
      const node = a as TypeReferenceNode
      const identifier = node?.typeName as Identifier
      return identifier?.escapedText === 'SlotsType'
    }
  }) as TypeReferenceNode | undefined

  if (!typeReference) {
    return
  }

  const slotsType = typeReference.typeArguments?.find(a => a.kind === SyntaxKind.TypeLiteral) as TypeLiteralNode | undefined
  if (!slotsType) {
    return
  }

  processTypeLiteral(slotsType, context, 'slots')
}

function processEmits(context: DefineComponentContext) {
  const emitsTypeLiteral = context.importType.typeArguments?.find(a => {
    if (a.kind === SyntaxKind.TypeLiteral) {
      const literal = a as TypeLiteralNode
      if (literal.members?.length) {
        const first = literal.members[0]
        if (first.kind === SyntaxKind.MethodSignature) {
          return first.getFullText().includes('@group emits')
        }
      }
    }
  }) as TypeLiteralNode | undefined

  if (!emitsTypeLiteral) {
    return
  }

  processTypeLiteral(emitsTypeLiteral, context)
}

function processTypeLiteral(typeLiteral: TypeLiteralNode, context: DefineComponentContext, group: string = '') {
  // set the properties of the props type as children of the the now module declaration
  const scope = context.context.withScope(context.reflection)
  const someType = context.context.converter.convertType(scope, typeLiteral) as ReflectionType

  if (!context.reflection.children) {
    context.reflection.children = []
  }

  if (!context.reflection.signatures) {
    context.reflection.signatures = []
  }

  for (const prop of someType?.declaration?.children ?? []) {
    if (group) {
      const tags = prop.comment?.blockTags ?? ([] as CommentTag[])
      tags.push(new CommentTag(`@group`, [{ text: group, kind: 'text' }]))
      prop.comment = new Comment(prop.comment?.summary, tags, prop.comment?.modifierTags)
    }

    let toAdd = prop as DeclarationReflection | undefined
    if (group === 'slots') {
      toAdd = createTypeLiteralFromSlotPropertySignature(prop, prop.type)
    }

    if (!toAdd) {
      return
    }

    context.reflection.children.push(toAdd)
    toAdd.parent = context.reflection
    toAdd.comment = prop.comment
    toAdd.kind = ReflectionKind.TypeLiteral
  }

  for (const signature of someType?.declaration?.signatures ?? []) {
    context.reflection.signatures?.push(signature)
    signature.parent = context.reflection
  }
}

function createTypeLiteralFromSlotPropertySignature(slot: DeclarationReflection, current: SomeType | undefined): DeclarationReflection | undefined {
  if (!current) {
    return undefined
  }

  if (current.type === 'reflection') {
    if (current.declaration.signatures?.length && current.declaration.signatures[0].parameters?.length) {
      return createTypeLiteralFromSlotPropertySignature(slot, current.declaration.signatures[0].parameters[0].type)
    }
    if (current.declaration.type) {
      return createTypeLiteralFromSlotPropertySignature(slot, current.declaration.type)
    }
    if (current.declaration.children?.length) {
      var slotType = new DeclarationReflection(slot.name, ReflectionKind.TypeLiteral)
      slotType.type = current

      for (const child of current.declaration.children ?? []) {
        if (child.type?.type === 'reflection') {
          if (child.type.declaration.signatures?.length) {
            child.type = new IntrinsicType(functionType(child.type.declaration.signatures))
            //child.type.declaration.signatures = undefined;
          }
        }
      }

      return slotType
    }
  }

  if (current.type === 'union') {
    if (current.types.length > 0) {
      return createTypeLiteralFromSlotPropertySignature(slot, current.types[0])
    }
    return undefined
  }

  return undefined
}

function functionType(modelSignatures: SignatureReflection[]): string {
  const functions = modelSignatures.map(fn => {
    const typeParams = fn.typeParameters ? `\\<${fn.typeParameters.map(typeParameter => backTicks(typeParameter.name)).join(', ')}\\>` : []
    const params = fn.parameters
      ? fn.parameters.map(param => {
          return `${param.flags.isRest ? '...' : ''}${backTicks(param.name)}${param.flags.isOptional ? '?' : ''}`
        })
      : []
    const returns = 'any' //context.someType(fn.type as SomeType);
    return typeParams + `(${params.join(', ')}) => ${returns}`
  })
  return functions.join('')
}

function backTicks(text: string) {
  return text ///(\`)/g.test(text) ? text.replace(/`/g, '\\`') : `\`${text}\``;
}
