#include<stdio.h>
#include <stdarg.h>
void printt(const char* format, ...) {
va_list args;
va_start(args, format);
vprintf(format, args);
fflush(stdout);
va_end(args);
}
int scann(const char* format, ...) {
va_list args;
va_start(args, format);
printt("-1a\n");
fflush(stdout);
int result = vscanf(format, args);
va_end(args);
return result;
}
int main() {
double first, second, temp;
printt("Enter first number: ");
scann("%lf", &first);
printt("Enter second number: ");
scann("%lf", &second);
// value of first is assigned to temp
temp = first;
// value of second is assigned to first
first = second;
// value of temp (initial value of first) is assigned to second
second = temp;
// %.2lf displays number up to 2 decimal points
printt("\nAfter swapping, first number = %.2lf\n", first);
printt("After swapping, second number = %.2lf", second);
return 0;
}