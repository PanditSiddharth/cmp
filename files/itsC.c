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
#include<string.h>
int main() {
typedef struct cricketer{
char name[15];
int age ;
int noOfmatches ;
float average ;
} cricketer ;
cricketer arr[3];
for(int i=0;i<3;i++) {
char str[15];
scann("%[^\ns",str);
strcpy(arr[i].name,str);
scann("%d",&arr[i].age);
scann("%d",&arr[i].noOfmatches);
scann("%f",&arr[i].average);
}
for(int k=0;k<3;k++){
printt("name :%s ", arr[k].name);
printt("age :%d",arr[k].age);
printt("no off matches: %d",arr[k].noOfmatches);
printt("Average ;%f",arr[k].average);
}
return 0;
}