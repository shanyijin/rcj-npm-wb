import * as React from 'react';

import { RuleObject as AntdRuleObject } from 'antd/es/form';
import {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
  FormInstance as AntdFormInstance,
} from 'antd/es/form';

export declare type ValidatorKeys =
  | 'required'
  | 'mobile'
  | 'idcard'
  | 'cn'
  | 'en'
  | 'email'
  | 'int'
  | 'float'
  | 'number'
  | 'url'
  | 'trim'
  | 'len'
  | 'maxLen'
  | 'minLen'
  | 'max'
  | 'min'
  | 'maxEqual'
  | 'minEqual'
  | 'checked'
  | 'maxDecimalDigits'
  | 'minDecimalDigits'
  | 'maxEqualDecimalDigits'
  | 'minEqualDecimalDigits'
  | 'ip';
export declare type ValidatorRuleObject =
  | AntdRuleObject
  | ((form: FormInstance) => ValidatorRule);

export declare type ValidatorRule = ValidatorRuleObject & {
  [name in ValidatorKeys]?: any;
} & {
  message?: string;
};

export declare type ValidatorRules =
  | ValidatorKeys
  | ValidatorRule
  | (ValidatorKeys | ValidatorRule)[];

export declare const DATA_FORM_COMPONENT_FIELD_ERRORS =
  'data-form-component-field-errors';
export interface FormItemProps<Values = any>
  extends Record<string, any>,
    Omit<AntdFormItemProps<Values>, 'rules' | 'children'> {
  rules?: ValidatorRules;
}
export interface FormInstance<Values = any> extends AntdFormInstance<Values> {
  createFormItem: (
    options: FormItemProps<Values>,
  ) => (
    node?: AntdFormItemProps<Values>['children'],
  ) => React.ReactElement<any, any>;
}
export interface FormItemNode {
  [DATA_FORM_COMPONENT_FIELD_ERRORS]?: string[];
}
export interface Option {}
export interface FormProps<Values = any> extends AntdFormProps<Values> {}
export default function useForm<Values = any>(
  form?: FormInstance<Values>,
): [FormInstance<Values>, AntdFormProps<Values>];
