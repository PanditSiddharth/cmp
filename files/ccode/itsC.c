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
int i = 1;  // starting value
int sum = 0;  // initialize sum to 0
while (i <= 100) {  // we'll add up the first 100 terms
sum += i;
i += 3;  // increase i by 3 each iteration to get to the next term
}
printt("The sum of the series is: %dn", sum);
return 0;
}