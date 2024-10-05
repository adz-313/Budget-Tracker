import {
  HomePageNavigationProp,
  HomePageRouteProp,
} from "@src/types/navigation/types";
import { Transaction, TransactionGroup } from "@src/types/common/types";

export type HomeScreenProps = {
  route: HomePageRouteProp;
  navigation: HomePageNavigationProp;
  newTransactionId: string;
  setNewTransactionId: (newTransactionId: string) => void;
  existingTransactionId: string;
  setExistingTransactionId: (existingTransactionId: string) => void;
  isFormTouched: boolean;
  setIsFormTouched: (isFormTouched: boolean) => void;
};

export type TransactionGroupCardListProps = {
  navigation: HomePageNavigationProp;
  dataState: TransactionGroup[];
  setExistingTransactionId: (existingTransactionId: string) => void;
  totalExpenditure: number;
  totalIncome: number;
};

export type TransactionGroupCardProps = {
  navigation: HomePageNavigationProp;
  setExistingTransactionId: (existingTransactionId: string) => void;
  displayDate: string;
  transactions: Transaction[];
  totalAmount: number;
};

export type ViewTotalTransactionsProps = {
  totalExpenditure: number;
  totalIncome: number;
};
