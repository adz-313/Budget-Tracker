export type Account = {
  id: string;
  name: string;
  icon: string;
};

export type AccountGroup = {
  name: string;
  accounts: Account[];
};

export const accounts: AccountGroup[] = [
  {
    name: "Cash",
    accounts: [{ id: "1", name: "Cash in Hand", icon: "cash-outline" }],
  },
  {
    name: "Bank Accounts",
    accounts: [
      { id: "2", name: "Checking Account", icon: "wallet-outline" },
      { id: "3", name: "Savings Account", icon: "home-outline" },
    ],
  },
  {
    name: "Cards",
    accounts: [
      { id: "4", name: "Visa Credit Card", icon: "card-outline" },
      { id: "5", name: "Mastercard Debit Card", icon: "card-outline" },
    ],
  },
];
