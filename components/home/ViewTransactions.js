import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { categories } from "../../constants/categories";
import ViewTotalTransactions from "./ViewTotalTransactions";
import { SCREENS } from "../../constants/constants";
import { TouchableOpacity } from "react-native";

const TransactionCard = ({
  navigation,
  setExistingTransactionId,
  date,
  transactions,
  totalAmount,
}) => (
  <View style={styles.card}>
    <View style={styles.groupHeader}>
      <Text style={styles.groupHeaderText}>{date}</Text>
      <Text style={styles.groupHeaderText}>{totalAmount} $</Text>
    </View>
    {transactions.map((transaction) => (
      <TouchableOpacity
        key={transaction.id}
        onPress={() => {
          setExistingTransactionId(transaction.id);
          navigation.navigate(SCREENS.FORMSTACK);
        }}
      >
        <View style={styles.transaction} key={transaction.id}>
          <View style={styles.iconWrapper}>
            <Icon
              name={
                categories[transaction.type].find(
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
      </TouchableOpacity>
    ))}
  </View>
);

export default function ViewTransactions({
  navigation,
  dataState,
  setExistingTransactionId,
  totalExpenditure,
  totalIncome,
}) {
  return (
    <View>
      <ViewTotalTransactions
        totalExpenditure={totalExpenditure}
        totalIncome={totalIncome}
      />
      {dataState.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTransactionText}>No transactions today</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {dataState.map((transaction) => (
            <TransactionCard
              navigation={navigation}
              setExistingTransactionId={setExistingTransactionId}
              key={transaction.id}
              date={transaction.displayDate}
              transactions={transaction.transactions}
              totalAmount={
                transaction.totalIncome - transaction.totalExpenditure
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  emptyTransactionText: {
    fontSize: 20,
    marginTop: 100,
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
