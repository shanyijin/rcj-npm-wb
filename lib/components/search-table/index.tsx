import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useAntdTable } from 'ahooks';
import style from './index.less';

const { Option } = Select;

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = (
  { current, pageSize },
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const [form] = Form.useForm();

  const { loading, tableProps, search, params } = useAntdTable(getTableData, {
    form,
    defaultParams: [
      { current: 1, pageSize: 5 },
      { name: 'hello', email: 'abc@gmail.com', gender: 'female' },
    ],
    defaultType: 'advance',
  });

  const { type, changeType, submit, reset } = search;

  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];
  const searchForm = (
    <Form form={form}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="name" name="name">
            <Input placeholder="name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="email" name="email">
            <Input placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="phone" name="phone">
            <Input placeholder="phone" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const advanceSearchForm = (
    <Form form={form}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="name" name="name">
            <Input placeholder="name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="email" name="email">
            <Input placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="phone" name="phone">
            <Input placeholder="phone" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      <div className={style['search-form']}>
        <div className={style['form-box']}>
          {searchForm}
          {type === 'simple' ? advanceSearchForm : undefined}
        </div>
        <Row
          gutter={24}
          justify="end"
          style={{ marginBottom: 24 }}
          className={style['search']}
        >
          <Button type="primary" onClick={submit}>
            搜索
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            重置
          </Button>
          <Button type="link" onClick={changeType}>
            {type === 'simple' ? '收起' : '展开'}
          </Button>
        </Row>
      </div>
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
