#include <stdio.h>
int main()
{int num, i, count =0;
printf("Enetr num: ");
	fflush(stdout);
printf("-1a\n");
	fflush(stdout);
	scanf("%d",&num);
for( i=1; i<=num; i++) {
if(num%i == 0){
printf("%d\n", i);
	fflush(stdout);
}
}
return 0;
}