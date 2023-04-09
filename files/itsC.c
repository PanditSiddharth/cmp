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
int main()
{
int i, j, k;
for (i = 1; i <= 5; i++)
{
for (j = 1; j <= 6 - i; j++)
{
printt("*");
}
for (k = 1; k < i; k++)
{
printt("  ");
} 
for (j = 1; j <= 6 - i; j++)
{
printt("*");
}
printt("\n");
}
for (i = 2; i <= 5; i++)
{
for (j = 1; j <= i; j++)
{
printt("*");
}
for (k = 1; k <= 5 - i; k++)
{
printt("  ");
}
for (j = 1; j <= i; j++)
{
printt("*");
}
printt("\n");
}
return 0;
}