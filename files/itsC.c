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
int arr[100], n, search, i;
printt("Enter the number of elements in the array: ");
scann("%d", &n);
printt("Enter the elements of the array: ");
for (i = 0; i < n; i++) {
scann("%d", &arr[i]);
}
printt("Enter the element to search: ");
scann("%d", &search);
for (i = 0; i < n; i++) {
if (arr[i] == search) {
printt("%d found at position %d.\n", search, i + 1);
break;
}
}
if (i == n) {
printt("%d not found in the array.\n", search);
}i
return 0;
}