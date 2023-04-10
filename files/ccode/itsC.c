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
#include <stdlib.h> 
#include <math.h> 
int main() { 
int n, i, j, k; 
float a[10][10] = {0.0}, x[10] = {0.0}; 
float pivot = 0.0; 
float factor = 0.0; 
float sum = 0.0; 
printt("Gauss Elimination \n\n"); 
printt("Enter the number of equations: "); 
scann("%d", &n); 
printt("\n\t Input Coefficients a[i, j + 1], row-wise\n"); 
for (i = 1; i <= n; i++) { 
for (j = 1; j <= n+1; j++) { 
scann("%f", &a[i][j]); 
} 
} 
printt("\n\n"); 
for (i = 1; i <= n; i++) {
for (int j = 1; j <= n+1; j++) { 
printt("\t%10.0f", a[i][j]); 
} 
printt("\n\n"); 
} 
for (k = 1; k <= n-1; k++) { 
if(a[k][k] == 0.0){ 
printt("error"); 
} else { 
pivot = a[k][k]; 
for(j = k; j <= n+1; j++) 
a[k][j] = a[k][j] / pivot; 
for(i = k+1; i <= n; i++){ 
factor = a[i][k]; 
for (j = k; j <= n+1; j++) { 
a[i][j] = a[i][j] - factor * a[k][j]; 
} 
} 
} 
if(a[n][n] == 0) 
printt("error"); 
else { 
x[n] = a[n][n+1] / a[n][n]; 
for (i = n-1; i >= 1; i--) { 
sum = 0.0;
for(j = i+1; j <= n; j++) 
sum = sum + a[i][j] * x[j]; 
x[i] = (a[i][n+1] - sum) / a[i][i]; 
} 
} 
} 
for (i = 1; i <= n; i++) { 
printt("\n\tx[%1d] = %10.4f", i, x[i]); 
} 
system("Pause"); 
return 0; 
}