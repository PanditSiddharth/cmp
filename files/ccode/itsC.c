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
#include <string.h>
#include <stdlib.h>
int main() {
char url[100];
char command[200];
printt("Welcome to the Simple Browser.nn");
while (1) {
printt("Enter the URL (or q to exit): ");
scann("%s", url);
if (strcmp(url, "q") == 0) {
printt("Exiting the Simple Browser. Goodbye!n");
break;
}
sprintf(command, "start %s", url);
system(command);
}
return 0;
}