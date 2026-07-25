import java.sql.*;

public class MoneyTransfer {

    public static void transfer(
            Connection con,
            int fromAcc,
            int toAcc,
            double amount)
            throws Exception {

        try {

            con.setAutoCommit(false);

            PreparedStatement debit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance=balance-? WHERE id=?");

            debit.setDouble(1, amount);
            debit.setInt(2, fromAcc);

            debit.executeUpdate();

            PreparedStatement credit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance=balance+? WHERE id=?");

            credit.setDouble(1, amount);
            credit.setInt(2, toAcc);

            credit.executeUpdate();

            con.commit();

            System.out.println(
                    "Transfer Successful");

        } catch (Exception e) {

            con.rollback();

            System.out.println(
                    "Transfer Failed");
        }
    }

    public static void main(String[] args)
            throws Exception {

        Connection con =
                DriverManager.getConnection(
                        "jdbc:mysql://localhost:3306/bankdb",
                        "root",
                        "Utkarsh@786");

        transfer(con, 1, 2, 5000);
    }
}