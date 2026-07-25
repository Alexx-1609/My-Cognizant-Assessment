import java.sql.*;

public class JDBCConnectionDemo {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/studentdb";
        String user = "root";      // or your valid user
        String password = "Utkarsh@786";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,
                            user,
                            password);

            System.out.println("Connected Successfully!");

            Statement stmt =
                    con.createStatement();

            ResultSet rs =
                    stmt.executeQuery(
                            "SELECT * FROM students");

            while (rs.next()) {

                System.out.println(
                        rs.getInt("id") + " "
                        + rs.getString("name") + " "
                        + rs.getDouble("marks"));
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}