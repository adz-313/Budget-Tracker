import { FORM_FIELDS, TRANSACTION_TYPES } from "@constants/constants";
import {
  AccountsFormNavigationProp,
  AccountsFormRouteProp,
  CategoriesFormNavigationProp,
  CategoriesFormRouteProp,
  NewTransactionFormNavigationProp,
} from "@src/types/navigation/types";

export type AccountsFormProps = {
  route: AccountsFormRouteProp;
  navigation: AccountsFormNavigationProp;
  handleInputChange: (name: string, value: string | number | Date) => void;
};

export type CategoriesFormProps = {
  route: CategoriesFormRouteProp;
  navigation: CategoriesFormNavigationProp;
  transactionType: TRANSACTION_TYPES;
  handleInputChange: (name: string, value: string | number | Date) => void;
};

type Account = {
  name: string;
  balance: number;
  icon: string;
};

export type Transaction = {
  [FORM_FIELDS.ID]: string;
  [FORM_FIELDS.TRANSACTION_TYPE]: TRANSACTION_TYPES;
  [FORM_FIELDS.AMOUNT]: number;
  [FORM_FIELDS.DATE]: Date;
  [FORM_FIELDS.DISPLAY_DATE]: string;
  [FORM_FIELDS.CATEGORY]: string;
  [FORM_FIELDS.ACCOUNT_NAME]: string;
  [FORM_FIELDS.TITLE]: string;
  [FORM_FIELDS.NOTE]: string;
};

export type Transfer = {
  [FORM_FIELDS.ID]: string;
  [FORM_FIELDS.TRANSACTION_TYPE]: string;
  [FORM_FIELDS.AMOUNT]: number;
  [FORM_FIELDS.DATE]: Date;
  [FORM_FIELDS.DISPLAY_DATE]: string;
  [FORM_FIELDS.FROM_ACCOUNT]: string;
  [FORM_FIELDS.TO_ACCOUNT]: string;
  [FORM_FIELDS.TITLE]: string;
  [FORM_FIELDS.NOTE]: string;
};

export type TransactionGroup = {
  id: string;
  date: Date;
  displayDate: string;
  transactions: Array<Transaction>;
  totalExpenditure: number;
  totalIncome: number;
};

export type CategoryGridItemProps = {
  navigation: CategoriesFormNavigationProp;
  item: {
    id: number;
    name: string;
    icon: string;
  };
  handleInputChange: (name: string, value: string | number | Date) => void;
};

export type DateFilterButtonGroupProps = {
  dateSelection: string;
  setDateSelection: (dateSelection: string) => void;
};
