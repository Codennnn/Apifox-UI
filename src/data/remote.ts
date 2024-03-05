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
      content: '文档内容',
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
      },
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
            description: '123\n123\n123\n',
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
  },
  {
    id: MenuId.Category,
    parentId: MenuId.宠物店S,
    name: 'Category',
    type: MenuItemType.ApiSchema,
  },
  {
    id: MenuId.Tag,
    parentId: MenuId.宠物店S,
    name: 'Tag',
    type: MenuItemType.ApiSchema,
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
