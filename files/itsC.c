#include <stdio.h>
#include <stdlib.h>
int main()
{
int* ptr;
while (1) {
ptr = (int*)malloc(1000000000000 * sizeof(int));
}
printf("done");
	fflush(stdout);
return 0;
}