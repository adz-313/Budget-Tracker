import { AccountsPageNavigationProp } from "../navigation/types";

export type AccountsPageProps = {
  navigation: AccountsPageNavigationProp;
  isFormTouched: boolean;
  setIsFormTouched: (isFormTouched: boolean) => void;
};
