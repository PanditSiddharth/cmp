#include <stdio.h>
#include <unistd.h>
int main() {
int in;
printf("Enter your input:");
	fflush(stdout);
printf("-1a\n");
	fflush(stdout);
	scanf("%d", &in);
printf("You provided: %d", in);
	fflush(stdout);
return 0;
}