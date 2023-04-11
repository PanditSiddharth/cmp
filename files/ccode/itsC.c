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
void convertMillisecondsToTime(long long int milliseconds) {
// 1 hour = 3600000 milliseconds
// 1 minute = 60000 milliseconds
// 1 second = 1000 milliseconds
int hours, minutes, seconds;
// Convert the milliseconds to hours, minutes, and seconds
seconds = (int) (milliseconds / 1000) % 60;
minutes = (int) ((milliseconds / (1000*60)) % 60);
hours   = (int) ((milliseconds / (1000*60*60)) % 24);
// Print the result in hh:mm:ss format
printt("%02d:%02d:%02dn", hours, minutes, seconds);
}
int main() {
long long int milliseconds;
printt("Enter the time in milliseconds: ");
scann("%lld", &milliseconds);
printt("The time in the format hh:mm:ss is: ");
convertMillisecondsToTime(milliseconds);
return 0;
}