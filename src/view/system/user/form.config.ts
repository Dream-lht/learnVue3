import { IOptionsItemType } from '@/components/customizeForm/configType';

const UserOptions: IOptionsItemType[] = [
  {
    type: 'text',
    placeholder: '请输入ID',
    label: 'id',
    prop: 'id',
  },
  {
    type: 'text',
    placeholder: '请输入用户名',
    label: '用户名',
    prop: 'userName',
  },
  {
    type: 'datePicker',
    placeholder: '',
    label: '创建时间',
    dataPickerOptions: {
      type: 'daterange',
      startPlaceholder: '创建时间',
      endPlaceholder: '结束时间',
    },
  },
];

export default UserOptions;
