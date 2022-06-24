import { Form } from 'antd';
import { FormItemProps as AntdFormItemProps } from 'antd/es/form';
import { FormInstance, FormItemProps } from './type';

const useForm = () => {
  const [form, ...otherForm] = Form.useForm();

  const createFormItem =
    (options: FormItemProps) => (node?: AntdFormItemProps['children']) => {
      const { rlues } = options;
      return (
        <Form.Item {...options} rlues={rlues}>
          {node}
        </Form.Item>
      );
    };

  Object.defineProperty(form, 'createFormItem', {
    value: createFormItem,
    writable: false,
  });
  return [...otherForm, form as FormInstance];
};

export default useForm;
