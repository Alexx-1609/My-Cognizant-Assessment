import java.util.Arrays;
import java.util.Comparator;

public class SearchTest {

    public static void main(String[] args) {

        Product[] products = {

            new Product(101, "Laptop", "Electronics"),
            new Product(102, "Shoes", "Fashion"),
            new Product(103, "Watch", "Accessories"),
            new Product(104, "Phone", "Electronics"),
            new Product(105, "Bag", "Fashion")

        };

        System.out.println("Linear Search:");

        Product result1 = LinearSearch.search(products, "Phone");

        if(result1 != null)
            System.out.println(result1);
        else
            System.out.println("Product not found");

        Arrays.sort(products,
                Comparator.comparing(Product::getProductName));

        System.out.println("\nBinary Search:");

        Product result2 = BinarySearch.search(products, "Phone");

        if(result2 != null)
            System.out.println(result2);
        else
            System.out.println("Product not found");
    }
}