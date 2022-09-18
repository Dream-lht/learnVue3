type formItemType =
  | 'text'
  | 'password'
  | 'select'
  | 'radio'
  | 'checkBox'
  | 'datePicker';

// dataPicker 的options
type DataPickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
  | 'button';

type DataPickerFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD';

interface IDataPickerOptions {
  type: DataPickerType;
  startPlaceholder?: string;
  endPlaceholder?: string;
  format?: DataPickerFormat;
}

// el-select的options

interface ISelectOptions {
  options: any;
  keyProp: string;
  labelProp: string;
  valueProp: string;
}
// 对el-col进行响应式
export interface IColLayout {
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  span?: number;
}

// el-input类型
type IInputType = 'text' | 'password' | 'number' | 'file';

export interface IOptionsItemType {
  type: formItemType;
  placeholder: string;
  prop?: string;
  label?: string;
  span?: number;
  rules?: any;
  dataPickerOptions?: IDataPickerOptions;
  selectOptions?: ISelectOptions;
}
