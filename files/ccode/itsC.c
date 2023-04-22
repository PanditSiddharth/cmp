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
int arr[5] = {1, 2, 3, 4, 5};
int i;
for (i = 4; i >= 0; i--) {
printt("%d\n", arr[i]);
}
return 0;
}