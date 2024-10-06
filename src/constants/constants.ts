export enum TRANSACTION_TYPES {
  INCOME = "Income",
  EXPENDITURE = "Expenditure",
  TRANSFER = "Transfer",
}

export enum SCREENS {
  HOME_PAGE = "HomePage",
  STATISTICS_PAGE = "StatisticsPage",
  FORM_PAGE = "FormPage",
  ACCOUNTS_PAGE = "AccountsPage",
  SETTINGS_PAGE = "SettingsPage",
  SELECT_ACCOUNTS_SCREEN = "SelectAccountsScreen",
  SELECT_CATEGORIES_SCREEN = "SelectCategoriesScreen",
  NEW_TRANSACTION_SCREEN = "NewTransactionScreen",
}

export enum FORM_FIELDS {
  ID = "id",
  TRANSACTION_TYPE = "transactionType",
  AMOUNT = "amount",
  DATE = "date",
  DISPLAY_DATE = "displayDate",
  CATEGORY = "category",
  ACCOUNT = "account",
  ACCOUNT_NAME = "accountName",
  FROM_ACCOUNT = "fromAccount",
  TO_ACCOUNT = "toAccount",
  TITLE = "title",
  RECIPIENT = "recipient",
  NOTE = "note",
}

export const DATE_PERIODS = {
  TODAY: "Today",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
};
