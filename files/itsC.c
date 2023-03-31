#include <stdio.h>
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
int main(){
int number1, number2, sum;
printt("Enter two integers: ");
scann("%d", &number1);
scann("%d", &number2);
// calculate the sum
sum = number1 + number2;
printt("%d + %d = %d", number1, number2, sum);
return 0;
}