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
int main() {
int num = 5; // change this to the number whose factorial you want to find
int fact = 1;
for (int i = 1; i <= num; i++) {
fact *= i;
}
printt("The factorial of %d is %d", num, fact);
return 0;
}