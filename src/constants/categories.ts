import { TRANSACTION_TYPES } from "./constants";

export const categories = {
  [TRANSACTION_TYPES.INCOME]: [
    { id: 1, name: "Salary", icon: "briefcase-outline" },
    { id: 2, name: "Freelancing", icon: "laptop-outline" },
    { id: 3, name: "Investments", icon: "bar-chart-outline" },
    { id: 4, name: "Rent", icon: "home-outline" },
    { id: 5, name: "Business", icon: "storefront-outline" },
    { id: 6, name: "Gifts", icon: "gift-outline" },
    { id: 7, name: "Selling", icon: "cart-outline" },
    { id: 8, name: "Dividends", icon: "cash-outline" },
    { id: 9, name: "Savings", icon: "wallet-outline" },
    { id: 11, name: "Awards", icon: "medal-outline" },
    { id: 12, name: "Grants", icon: "school-outline" },
    { id: 13, name: "Refunds", icon: "receipt-outline" },
    { id: 14, name: "Lottery", icon: "trophy-outline" },
    { id: 15, name: "Coupons", icon: "pricetag-outline" },
    { id: 10, name: "Other", icon: "ellipsis-horizontal-outline" },
  ],
  [TRANSACTION_TYPES.EXPENDITURE]: [
    { id: 1, name: "Groceries", icon: "cart-outline" },
    { id: 2, name: "Vehicle", icon: "car-outline" },
    { id: 3, name: "Entertainment", icon: "film-outline" },
    { id: 4, name: "Shopping", icon: "shirt-outline" },
    { id: 5, name: "Health", icon: "medical-outline" },
    { id: 6, name: "Education", icon: "school-outline" },
    { id: 7, name: "Travel", icon: "airplane-outline" },
    { id: 8, name: "Dining", icon: "fast-food-outline" },
    { id: 9, name: "Rent", icon: "home-outline" },
    { id: 10, name: "Utilities", icon: "bulb-outline" },
    { id: 11, name: "Transportation", icon: "bus-outline" },
    { id: 12, name: "Medicine", icon: "medkit-outline" },
    { id: 13, name: "Insurance", icon: "shield-checkmark-outline" },
    { id: 14, name: "Debt Repayment", icon: "wallet-outline" },
    { id: 15, name: "Fitness", icon: "barbell-outline" },
    { id: 16, name: "Charity", icon: "heart-outline" },
    { id: 17, name: "Subscriptions", icon: "newspaper-outline" },
    { id: 18, name: "Gifts", icon: "gift-outline" },
    { id: 19, name: "Taxes", icon: "cash-outline" },
    { id: 20, name: "Childcare", icon: "happy-outline" },
    { id: 21, name: "Pets", icon: "paw-outline" },
    { id: 22, name: "Other", icon: "ellipsis-horizontal-outline" },
  ],
  [TRANSACTION_TYPES.TRANSFER]: [
    { id: 1, name: "Groceries", icon: "cart-outline" },
  ],
};

export const getCategories = (categoryType: TRANSACTION_TYPES) => {
  const numColumns = 4;
  let length = categories[categoryType].length;
  const remainder = length % numColumns;
  if (remainder !== 0) {
    const numEmptySlots = numColumns - remainder;
    for (let i = 0; i < numEmptySlots; i++) {
      categories[categoryType].push({ id: length++, name: "", icon: "" });
    }
  }
  return categories[categoryType];
};
