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
int main(){
int n;
printt("enter number:");
scann("%d",&n);
int sum=0;
for (int i=1;i<=n;i++){
sum=sum+i;
}
printt("sum is %d",sum);
sum=0;
for(int i=n; i>=1; i--) {
sum =sum+i;
}
printt("The reverse sum of first %d natural numbers is: %dn", n, sum);
return 0;
}