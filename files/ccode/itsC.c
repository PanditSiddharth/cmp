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
int main ()
{
float gross_salary, net_salary;
printt("Enter the salary of employee\n");
scann("%f", &gross_salary);
if (gross_salary<10000);
net_salary=gross_salary;
if (gross_salary >= 10000);
net_salary=gross_salary-0.15*gross_salary;
printt("\n Net salary is Rupees %f\n", net_salary);
return 0;
}