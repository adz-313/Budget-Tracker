import {
  FormPageRouteProp,
  FormPageNavigationProp,
  NewTransactionFormRouteProp,
  NewTransactionFormNavigationProp,
} from "@src/types/navigation/types";
import { Transaction, Transfer } from "@src/types/common/types";
import { TRANSACTION_TYPES } from "@src/constants/constants";

export type FormStackProps = {
  route: FormPageRouteProp;
  navigation: FormPageNavigationProp;
  newTransactionId: string;
  setNewTransactionId: (newTransactionId: string) => void;
  existingTransactionId: string;
  setExistingTransactionId: (existingTransactionId: string) => void;
  isFormTouched: boolean;
  setIsFormTouched: (isFormTouched: boolean) => void;
};

export type FormScreenProps = {
  route: NewTransactionFormRouteProp;
  navigation: NewTransactionFormNavigationProp;
  rootNavigation: FormPageNavigationProp;
  setNewTransactionId: (newTransactionId: string) => void;
  transactionForm: Transaction;
  transferForm: any;
  handleInputChange: (name: string, value: string | number | Date) => void;
  resetForm: () => void;
  selectedTransactionType: TRANSACTION_TYPES;
  setSelectedTransactionType: (transactionType: TRANSACTION_TYPES) => void;
  isInEditMode: boolean;
  setIsInEditMode: (isInEditMode: boolean) => void;
  deleteData: () => Promise<void>;
  setExistingTransactionId: (existingTransactionId: string) => void;
};

export type ExpenditureFormProps = {
  form: Transaction;
  handleInputChange: (name: string, value: string | number | Date) => void;
  navigation: NewTransactionFormNavigationProp;
};

export type IncomeFormProps = {
  form: Transaction;
  handleInputChange: (name: string, value: string | number | Date) => void;
  navigation: NewTransactionFormNavigationProp;
};

export type TransferFormProps = {
  form: Transfer;
  handleInputChange: (name: string, value: string | number | Date) => void;
  navigation: NewTransactionFormNavigationProp;
};

export type TransactionTypeButtonGroupProps = {
  resetForm: () => void;
  selectedTransactionType: TRANSACTION_TYPES;
  setSelectedTransactionType: (transactionType: TRANSACTION_TYPES) => void;
  isInEditMode: boolean;
};
