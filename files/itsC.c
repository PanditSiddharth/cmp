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
int main() {
char str[]= "I AM THE BEST";
int sum=0;
int i = 0;
int k;
while(str[i] !='\0') {
sum ++;
i++;
}
for(int j=0,k=sum-1;j<k;j++,k—){
str[j]=str[k];
}
return 0;
}