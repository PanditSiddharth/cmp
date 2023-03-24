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
int n,x,y;
scann("%d",&n);
if(n%2==0)
n=n+1;
for(y=3*n/2; y>=-3*(n/2); y--)
{
for(x=-3*(n/2); x<=3*(n/2); x++)
{
if((x>=-1*n/2 && x<=n/2) || (y>=-1*n/2 && y<=n/2))
{
if(x==y || x==-y)
printt("@ ");
else if((y<=0 || y>=n/2) && (x+y==n-1))
printt("@ ");
else if((y>=0 || y<=-n/2) && (x+y==1-n))
printt("@ ");
else if((x<=0 || x>=n/2) && (x-y==n-1))
printt("@ ");
else if((x>=0 || x<=-n/2) && (x-y==1-n))
printt("@ ");
else
printt("  ");
}
else
{
if(x+y==(n-1)*2)
printt("@ ");
else if(x+y==(1-n)*2)
printt("@ ");
else if(x-y==(n-1)*2)
printt("@ ");
else if(x-y==(1-n)*2)
printt("@ ");
else
printt("  ");
}
}
printt("\n");
}
}