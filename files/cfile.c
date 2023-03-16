#include <stdio.h>
#include <unistd.h>
int main() {
int in;
sleep(10);
printf("Enter your input:");
	fflush(stdout);
sleep(10);
printf("-1a\n");
	fflush(stdout);
	scanf("%d", &in);
sleep(10);
printf("You provided: %d", in);
	fflush(stdout);
sleep(10);
return 0;
}