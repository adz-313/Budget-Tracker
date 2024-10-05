import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "@constants/constants";

// cannot use SCREENS enum for some reason, make sure they match the SCREENS values
export type RootStackParamList = {
  HomePage: undefined;
  StatisticsPage: undefined;
  FormPage: undefined;
  AccountsPage: undefined;
  SettingsPage: undefined;
};

export type HomePageNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  SCREENS.HOME_PAGE
>;

export type HomePageRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.HOME_PAGE
>;

export type StatisticsPageNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  SCREENS.STATISTICS_PAGE
>;
export type StatisticsPageRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.STATISTICS_PAGE
>;

export type AccountsPageNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  SCREENS.ACCOUNTS_PAGE
>;
export type AccountsPageRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.ACCOUNTS_PAGE
>;

export type SettingsPageNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  SCREENS.SETTINGS_PAGE
>;
export type SettingsPageRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.SETTINGS_PAGE
>;

export type FormPageNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  SCREENS.FORM_PAGE
>;
export type FormPageRouteProp = RouteProp<
  RootStackParamList,
  SCREENS.FORM_PAGE
>;

export type FormStackParamList = {
  [SCREENS.NEW_TRANSACTION_SCREEN]: undefined;
  [SCREENS.SELECT_CATEGORIES_SCREEN]: {
    handleInputChange: (name: string, value: string | number | Date) => void;
  };
  [SCREENS.SELECT_ACCOUNTS_SCREEN]: {
    handleInputChange: (name: string, value: string | number | Date) => void;
    inputName: string;
  };
};

export type NewTransactionFormNavigationProp = NativeStackNavigationProp<
  FormStackParamList,
  SCREENS.NEW_TRANSACTION_SCREEN
>;
export type NewTransactionFormRouteProp = RouteProp<
  FormStackParamList,
  SCREENS.NEW_TRANSACTION_SCREEN
>;

export type CategoriesFormNavigationProp = NativeStackNavigationProp<
  FormStackParamList,
  SCREENS.SELECT_CATEGORIES_SCREEN
>;
export type CategoriesFormRouteProp = RouteProp<
  FormStackParamList,
  SCREENS.SELECT_CATEGORIES_SCREEN
>;

export type AccountsFormNavigationProp = NativeStackNavigationProp<
  FormStackParamList,
  SCREENS.SELECT_ACCOUNTS_SCREEN
>;
export type AccountsFormRouteProp = RouteProp<
  FormStackParamList,
  SCREENS.SELECT_ACCOUNTS_SCREEN
>;
