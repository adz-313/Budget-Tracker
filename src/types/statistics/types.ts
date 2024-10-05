import {
  StatisticsPageNavigationProp,
  StatisticsPageRouteProp,
} from "@src/types/navigation/types";

export type StatisticsScreenProps = {
  navigation: StatisticsPageNavigationProp;
  route: StatisticsPageRouteProp;
  isFormTouched: boolean;
  setIsFormTouched: (isFormTouched: boolean) => void;
};
