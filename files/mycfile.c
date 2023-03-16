#include <stdio.h>
#include <unistd.h>
int main() {
char cwd[PATH_MAX];
if (getcwd(cwd, sizeof(cwd)) != NULL) {
printf("Current working dir: %s\n", cwd);
	fflush(stdout);
} else {
printf("getcwd() error");
return 1;
}
return 0;
}