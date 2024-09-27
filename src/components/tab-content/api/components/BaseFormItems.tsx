import { useState } from 'react'

import Link from 'next/link'
import { Col, Form, Row, Select, type SelectProps } from 'antd'
import useResizeObserver from 'use-resize-observer'

import { SelectorService } from '@/components/SelectorService'
import { InputDesc } from '@/components/tab-content/api/components/InputDesc'
import { API_STATUS_CONFIG } from '@/configs/static'
import { creator } from '@/data/remote'

const statusOptions: SelectProps['options'] = Object.entries(API_STATUS_CONFIG).map(
  ([method, { text, color }]) => {
    return {
      value: method,
      label: (
        <span className="flex items-center">
          <span
            className="mr-2 inline-block size-[6px] rounded-full"
            style={{ backgroundColor: `var(${color})` }}
          />
          <span>{text}</span>
        </span>
      ),
    }
  }
)

export function BaseFormItems() {
  const [containerSize, setContainerSize] = useState<'xs' | 'sm' | 'md' | 'lg'>()

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width }) => {
      if (typeof width === 'number') {
        if (width >= 1000) {
          if (containerSize !== 'lg') {
            setContainerSize('lg')
          }
        } else if (width >= 700) {
          if (containerSize !== 'md') {
            setContainerSize('md')
          }
        } else if (width >= 500) {
          if (containerSize !== 'sm') {
            setContainerSize('sm')
          }
        } else {
          setContainerSize('xs')
        }
      }
    },
  })

  const colSpan =
    containerSize === 'lg' || containerSize === 'md' ? 6 : containerSize === 'sm' ? 12 : 24

  return (
    <div ref={ref}>
      <Row gutter={16}>
        <Col span={colSpan}>
          <Form.Item
            label="状态"
            labelCol={{ span: 24 }}
            name="status"
            rules={[{ required: true }]}
          >
            <Select options={statusOptions} />
          </Form.Item>
        </Col>

        <Col span={colSpan}>
          <Form.Item label="责任人" labelCol={{ span: 24 }} name="responsibleId">
            <Select
              options={[{ label: `${creator.name}（@${creator.username}）`, value: creator.id }]}
            />
          </Form.Item>
        </Col>

        <Col span={colSpan}>
          <Form.Item label="标签" labelCol={{ span: 24 }} name="tags">
            <Select mode="tags" placeholder="查找或回车创建标签" />
          </Form.Item>
        </Col>

        <Col span={colSpan}>
          <Form.Item
            label="服务（前置 URL）"
            labelCol={{ span: 24 }}
            name="serverId"
            tooltip={
              <span>
                指定服务后，该接口运行时会使用该服务对应的<b>前置 URL</b>（在
                <Link href="/">环境</Link>里设置）。
              </span>
            }
          >
            <SelectorService />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="说明" labelCol={{ span: 24 }} name="description">
            <InputDesc />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
