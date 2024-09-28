import { SectionList, View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { categories } from "../../constants/categories";
import ViewTotalTransactions from "./ViewTotalTransactions";

const TransactionCard = ({ date, transactions, totalAmount }) => (
  <View style={styles.card}>
    <View style={styles.groupHeader}>
      <Text style={styles.groupHeaderText}>{date}</Text>
      <Text style={styles.groupHeaderText}>{totalAmount} $</Text>
    </View>
    {transactions.map((transaction) => (
      <View style={styles.transaction} key={transaction.id}>
        <View style={styles.iconWrapper}>
          <Icon
            name={
              categories.find(
                (category) => category.name === transaction.category
              ).icon
            }
            size={20}
            color="#FF6347"
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.account}>{transaction.account}</Text>
        </View>
        <Text style={styles.amount}>{transaction.amount} $</Text>
      </View>
    ))}
  </View>
);

export default function ViewTransactions({ dataState, totalExpenditure }) {
  return (
    <View>
      {dataState.length === 0 ? (
        <View style={styles.center}>
          <Text>This is Home screen.</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <ViewTotalTransactions totalExpenditure={totalExpenditure} />
          {dataState.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              date={transaction.displayDate}
              transactions={transaction.transactions}
              totalAmount={transaction.totalAmount}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 130,
  },
  card: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupHeaderText: {
    fontSize: 18,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  transaction: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderTopColor: "#999",
    borderTopWidth: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#FF9986",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  account: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    color: "#333",
  },
});
