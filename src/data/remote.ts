import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu'
import type { ApiTabItem } from '@/components/ApiTab'
import { SchemaType } from '@/components/JsonSchema'
import { SERVER_INHERIT } from '@/configs/static'
import { ApiStatus, CatalogType, HttpMethod, MenuId, MenuItemType, ParamType } from '@/enums'
import { findFolders } from '@/helpers'
import type { ApiDetails, ApiSchema, Creator, RecycleData } from '@/types'

export const creator: Creator = {
  id: nanoid(),
  name: '张三',
  username: '李四',
}

/** 菜单原始数据，通常从服务端中获取，然后在客户端中需要被组装为树状结构。 */
export const apiDirectoryData: ApiMenuData[] = [
  {
    id: MenuId.默认分组,
    name: '默认分组',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.嵌套分组,
    parentId: MenuId.默认分组,
    name: '嵌套分组',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.xx,
    parentId: MenuId.嵌套分组,
    name: 'xxx',
    type: MenuItemType.Doc,
    data: {
      id: nanoid(),
      name: '文档',
      content:
        '---\n__Advertisement :)__\n\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\n  resize in browser.\n- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\n  i18n with plurals support and easy syntax.\n\nYou will like those projects!\n\n---\n\n# h1 Heading 8-)\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n\n\n## Horizontal Rules\n\n___\n\n---\n\n***\n\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,,  -- ---\n\n"Smartypants, double quotes" and \'single quotes\'\n\n\n## Emphasis\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n\n## Blockquotes\n\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\nInline `code`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\nBlock code "fences"\n\n```\nSample text here...\n```\n\nSyntax highlighting\n\n``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ "title text!")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"\n\n\n## Plugins\n\nThe killer feature of `markdown-it` is very effective support of\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\n\n\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\n\n> Classic markup: :wink: :cry: :laughing: :yum:\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n\nsee [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.\n\n\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n\n- 19^th^\n- H~2~O\n\n\n### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)\n\n++Inserted text++\n\n\n### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)\n\n==Marked text==\n\n\n### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n\n### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)\n\nTerm 1\n\n:   Definition 1\nwith lazy continuation.\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n  ~ Definition 1\n\nTerm 2\n  ~ Definition 2a\n  ~ Definition 2b\n\n\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\n\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n*[HTML]: Hyper Text Markup Language\n\n### [Custom containers](https://github.com/markdown-it/markdown-it-container)\n\n::: warning\n*here be dragons*\n:::\n',
    },
  },
  {
    id: MenuId.示例接口,
    parentId: MenuId.嵌套分组,
    name: '示例接口',
    type: MenuItemType.ApiDetail,
    data: {
      id: nanoid(),
      path: '/example',
      name: '示例接口',
      method: HttpMethod.Get,
      status: ApiStatus.Released,
      responsibleId: creator.id,
      serverId: SERVER_INHERIT,
      responses: [
        {
          code: 200,
          name: '成功',
          contentType: 'json',
          jsonSchema: {
            type: SchemaType.Object,
            properties: [],
          },
        },
      ],
    },
  },
  {
    id: MenuId.示例接口2,
    parentId: MenuId.嵌套分组,
    name: '名称超长的示例接口',
    type: MenuItemType.ApiDetail,
    data: {
      id: nanoid(),
      path: '/example',
      name: '名称超长的示例接口',
      method: HttpMethod.Get,
      status: ApiStatus.Released,
      responsibleId: creator.id,
      serverId: SERVER_INHERIT,
    },
  },
  {
    id: MenuId.宠物店,
    name: '宠物店',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.查询宠物详情,
    parentId: MenuId.宠物店,
    name: '查询宠物详情',
    type: MenuItemType.ApiDetail,
    data: {
      id: nanoid(),
      path: '/pet/{petId}',
      name: '查询宠物详情',
      method: HttpMethod.Get,
      status: ApiStatus.Developing,
      responsibleId: creator.id,
      tags: ['宠物'],
      serverId: SERVER_INHERIT,
      parameters: {
        query: [
          {
            id: nanoid(),
            name: 'a',
            type: ParamType.String,
            enable: true,
            required: false,
            description: '1.xxx\n2.xxx\n3.xxx',
            example: 'str',
          },
          {
            id: nanoid(),
            name: 'b',
            type: ParamType.Integer,
            enable: true,
            required: false,
            description: '',
            example: '100',
          },
        ],
        path: [
          {
            id: 'petId#0',
            name: 'petId',
            type: ParamType.String,
            enable: true,
            required: true,
            description: '宠物 ID',
            example: '1',
          },
        ],
      },
      responses: [
        {
          code: 200,
          name: '成功',
          contentType: 'json',
          jsonSchema: {
            type: SchemaType.Object,
            properties: [
              {
                name: 'code',
                type: SchemaType.Integer,
                description: '状态码',
              },
              {
                name: 'data',
                type: SchemaType.Refer,
                $ref: '#/definitions/1501168',
                description: '宠物信息',
              },
            ],
          },
        },
      ],
      responseExamples: [
        {
          id: '1',
          name: '成功示例',
          data: JSON.stringify({
            code: 0,
            data: {
              name: 'Hello Kitty',
              photoUrls: ['http://dummyimage.com/400x400'],
              id: 3,
              category: {
                id: 71,
                name: 'Cat',
              },
              tags: [
                {
                  id: 22,
                  name: 'Cat',
                },
              ],
              status: 'sold',
            },
          }),
        },
        {
          id: '2',
          name: '记录不存在',
          data: JSON.stringify({
            code: -1,
            message: 'Not found',
          }),
        },
      ],
      createdAt: '2022-03-23T12:00:00.000Z',
      updatedAt: '2022-03-23T12:00:00.000Z',
    },
  },
  {
    id: MenuId.新建宠物信息,
    parentId: MenuId.宠物店,
    name: '新建宠物信息',
    type: MenuItemType.ApiDetail,
    data: {
      id: nanoid(),
      path: '/pet',
      name: '新建宠物信息',
      method: HttpMethod.Post,
      status: ApiStatus.Testing,
      responsibleId: creator.id,
      tags: ['宠物'],
      serverId: SERVER_INHERIT,
      responseExamples: [
        {
          id: '1',
          name: '成功示例',
          data: JSON.stringify({
            code: 0,
            data: {
              name: 'Hello Kitty',
              photoUrls: ['http://dummyimage.com/400x400'],
              id: 3,
              category: {
                id: 71,
                name: 'Cat',
              },
              tags: [
                {
                  id: 22,
                  name: 'Cat',
                },
              ],
              status: 'sold',
            },
          }),
        },
      ],
    },
  },
  {
    id: MenuId.文档,
    name: '文档',
    type: MenuItemType.Doc,
    data: {
      id: nanoid(),
      name: '文档',
      content: '文档内容',
    },
  },
  {
    id: MenuId.宠物店S,
    name: '宠物店',
    type: MenuItemType.ApiSchemaFolder,
    data: {
      jsonSchema: {
        type: SchemaType.Boolean,
      },
    },
  },
  {
    id: MenuId.Pet,
    parentId: MenuId.宠物店S,
    name: 'Pet',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '宠物 ID 编号',
          },
          {
            name: 'category',
            type: SchemaType.Refer,
            $ref: '#/definitions/1501169',
            description: '分组',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '名称',
          },
          {
            name: 'photoUrls',
            type: SchemaType.Array,
            items: {
              type: SchemaType.String,
            },
            description: '照片URL',
          },
          {
            name: 'status',
            type: SchemaType.String,
            description: '宠物销售状态',
          },
        ],
      },
    },
  },
  {
    id: MenuId.Category,
    parentId: MenuId.宠物店S,
    name: 'Category',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '分组 ID 编号',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '分组名称',
          },
        ],
      },
    },
  },
  {
    id: MenuId.Tag,
    parentId: MenuId.宠物店S,
    name: 'Tag',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '标签 ID 编号',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '标签名称',
          },
        ],
      },
    },
  },
  {
    id: MenuId.引用模型,
    name: '引用模型',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Boolean,
      },
    },
  },
  {
    id: MenuId.Request,
    name: 'xxx',
    type: MenuItemType.RequestFolder,
  },
  {
    id: MenuId.Request2,
    parentId: MenuId.Request,
    name: 'https://abc.com',
    type: MenuItemType.HttpRequest,
    data: {
      id: nanoid(),
      path: 'https://abc.com',
      name: '查询宠物详情',
      method: HttpMethod.Get,
      status: ApiStatus.Developing,
      tags: ['宠物'],
      serverId: SERVER_INHERIT,
      responses: [
        {
          code: 200,
          name: '成功',
          contentType: 'json',
          jsonSchema: {
            type: SchemaType.Object,
            properties: [
              {
                name: 'code',
                type: SchemaType.Integer,
                description: '状态码',
              },
              {
                name: 'data',
                type: SchemaType.Refer,
                $ref: '#/definitions/1501168',
                description: '宠物信息',
              },
            ],
          },
        },
      ],
      createdAt: '2022-03-23T12:00:00.000Z',
    },
  },
]

export const recycleGroupData: RecycleData = {
  [CatalogType.Http]: {
    list: [
      {
        id: nanoid(),
        creator,
        deletedItem: {
          id: nanoid(),
          name: '接口1',
          type: MenuItemType.ApiDetail,
          data: {
            id: nanoid(),
            path: '/api',
            name: '接口1',
            method: HttpMethod.Get,
            status: ApiStatus.Released,
            responsibleId: creator.id,
            serverId: SERVER_INHERIT,
          },
        },
        expiredAt: '29天',
      },
      {
        id: nanoid(),
        creator,
        deletedItem: {
          id: nanoid(),
          parentId: MenuId.嵌套分组,
          name: '文档1',
          type: MenuItemType.Doc,
          data: {
            id: nanoid(),
            name: '文档1',
            content: '文档内容',
          },
        },
        expiredAt: '22天',
      },
      {
        id: nanoid(),
        creator,
        deletedItem: {
          id: nanoid(),
          parentId: MenuId.默认分组,
          name: '空分组',
          type: MenuItemType.ApiDetailFolder,
        },
        expiredAt: '11天',
      },
    ],
  },

  [CatalogType.Schema]: {
    list: [
      {
        id: nanoid(),
        creator,
        deletedItem: {
          id: nanoid(),
          name: '示例模型',
          type: MenuItemType.ApiSchema,
        },
        expiredAt: '28天',
      },
    ],
  },

  [CatalogType.Request]: {
    list: [
      {
        id: nanoid(),
        creator,
        deletedItem: {
          id: nanoid(),
          name: '示例请求',
          type: MenuItemType.HttpRequest,
          data: {
            id: nanoid(),
            path: '/request',
            name: '示例请求',
            method: HttpMethod.Get,
            status: ApiStatus.Released,
            responsibleId: creator.id,
            serverId: SERVER_INHERIT,
          },
        },
        expiredAt: '16天',
      },
    ],
  },
}

export const initialTabItems: ApiTabItem[] = (() => {
  return [
    ...apiDirectoryData
      .filter(({ id }) => {
        return (
          id === MenuId.示例接口 ||
          id === MenuId.宠物店 ||
          id === MenuId.查询宠物详情 ||
          id === MenuId.Pet ||
          id === MenuId.引用模型
        )
      })
      .map(({ id, name, type }) => {
        return {
          key: id,
          label: name,
          contentType: type,
        }
      }),
    {
      key: 'newCatalog',
      label: '新建...',
      contentType: 'blank',
    },
  ]
})()

export const initialActiveTabKey = MenuId.查询宠物详情

export const initialExpandedKeys: ApiMenuData['id'][] = [
  CatalogType.Http,
  CatalogType.Schema,
  ...initialTabItems.reduce<ApiMenuData['id'][]>((acc, { key }) => {
    const target = apiDirectoryData.find((item) => item.id === key)

    if (target?.parentId) {
      acc.push(...findFolders(apiDirectoryData, [], target.parentId).map(({ id }) => id))
    }

    return acc
  }, []),
]

export const initialCreateApiDetailsData: ApiDetails = {
  id: nanoid(),
  method: HttpMethod.Get,
  status: ApiStatus.Developing,
  serverId: SERVER_INHERIT,
  responses: [
    {
      code: 200,
      name: '成功',
      contentType: 'json',
      jsonSchema: {
        type: SchemaType.Object,
        properties: [],
      },
    },
  ],
}

export const initialCreateApiSchemaData: ApiSchema = {
  jsonSchema: {
    type: SchemaType.Object,
  },
}
