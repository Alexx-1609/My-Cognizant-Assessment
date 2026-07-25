import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSort {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Rahul");
        names.add("Aman");
        names.add("Vikas");
        names.add("Priya");

        Collections.sort(names,
                (a, b) -> a.compareTo(b));

        System.out.println(names);
    }
}