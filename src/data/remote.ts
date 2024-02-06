import type { ApiMenuData } from '@/components/ApiMenu'
import type { ApiTabItem } from '@/components/ApiTab'
import { SchemaType } from '@/components/JsonSchema'
import { ApiStatus, CatalogType, HttpMethod, MenuId, MenuItemType, MenuType } from '@/enums'

/** 菜单原始数据，通常从服务端中获取，然后在客户端中需要被组装为树状结构。 */
export const apiDirectoryData: ApiMenuData[] = [
  {
    id: MenuId.宠物店,
    name: '宠物店',
    menuType: MenuType.Folder,
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.查询宠物详情,
    parentId: MenuId.宠物店,
    name: '查询宠物详情',
    menuType: MenuType.File,
    type: MenuItemType.ApiDetail,
    data: {
      id: 'xx',
      path: '/pet/{petId}',
      name: '查询宠物详情',
      method: HttpMethod.Get,
      status: ApiStatus.Developing,
      tags: ['宠物'],
      serverId: '',
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
              name: 'Hello Kity',
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
    },
  },
  {
    id: MenuId.新建宠物信息,
    parentId: MenuId.宠物店,
    name: '新建宠物信息',
    menuType: MenuType.File,
    type: MenuItemType.ApiDetail,
    data: {
      id: 'xx',
      path: '/pet',
      name: '新建宠物信息',
      method: HttpMethod.Post,
      status: ApiStatus.Testing,
      tags: ['宠物'],
      serverId: '',
      responseExamples: [
        {
          id: '1',
          name: '成功示例',
          data: JSON.stringify({
            code: 0,
            data: {
              name: 'Hello Kity',
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
    menuType: MenuType.File,
    type: MenuItemType.Doc,
  },
  {
    id: 'schema.1',
    name: '宠物店',
    menuType: MenuType.Folder,
    type: MenuItemType.ApiSchemaFolder,
    data: {
      jsonSchema: {
        type: SchemaType.Boolean,
      },
    },
  },
  {
    id: 'schema.2',
    parentId: 'schema.1',
    name: 'Pet',
    menuType: MenuType.File,
    type: MenuItemType.ApiSchema,
  },
  {
    id: 'schema.3',
    parentId: 'schema.1',
    name: 'Category',
    menuType: MenuType.File,
    type: MenuItemType.ApiSchema,
  },
  {
    id: 'schema.4',
    parentId: 'schema.1',
    name: 'Tag',
    menuType: MenuType.File,
    type: MenuItemType.ApiSchema,
  },
  {
    id: 'schema.5',
    name: '引用模型',
    menuType: MenuType.File,
    type: MenuItemType.ApiSchema,
  },
]

/** 团队成员。 */
export const apiTabItems: ApiTabItem[] = []

export const initialTabItems: ApiTabItem[] = [
  {
    key: MenuId.查询宠物详情,
    label: '查询宠物详情',
    contentType: CatalogType.Http,
  },
  {
    key: 'newCatalog',
    label: '新建...',
    contentType: 'blank',
  },
]
