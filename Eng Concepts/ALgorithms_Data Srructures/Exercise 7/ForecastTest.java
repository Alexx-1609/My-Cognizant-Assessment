public class ForecastTest {

    public static void main(String[] args) {

        double presentValue = 10000;
        double growthRate = 0.10; // 10%
        int years = 5;

        double future = FinancialForecast.futureValue(
                presentValue,
                growthRate,
                years);

        System.out.printf("Future Value after %d years = %.2f",
                years, future);
    }
}