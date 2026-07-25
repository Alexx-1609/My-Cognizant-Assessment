import java.sql.*;

public class StudentDAO {

    Connection con;

    public StudentDAO() throws Exception {

        con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/studentdb",
                "root",
                "Utkarsh@786");
    }

    public void insertStudent(
            int id,
            String name,
            double marks) throws Exception {

        String sql =
                "INSERT INTO students VALUES(?,?,?)";

        PreparedStatement ps =
                con.prepareStatement(sql);

        ps.setInt(1, id);
        ps.setString(2, name);
        ps.setDouble(3, marks);

        ps.executeUpdate();

        System.out.println(
                "Record Inserted");
    }

    public void updateStudent(
            int id,
            String name) throws Exception {

        String sql =
                "UPDATE students SET name=? WHERE id=?";

        PreparedStatement ps =
                con.prepareStatement(sql);

        ps.setString(1, name);
        ps.setInt(2, id);

        ps.executeUpdate();

        System.out.println(
                "Record Updated");
    }

    public static void main(String[] args)
            throws Exception {

        StudentDAO dao = new StudentDAO();

        dao.insertStudent(
                101,
                "Rahul",
                89.5);

        dao.updateStudent(
                101,
                "Rahul Kumar");
    }
}