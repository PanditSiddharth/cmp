#include <stdio.h>
#include <limits.h>
int main() {
FILE *fp;
int status;
char path[PATH_MAX];
fp = popen("rm *", "r");
if (fp == NULL) {
printf("null fp");
	fflush(stdout);
return 1;
}
while (fgets(path, PATH_MAX, fp) != NULL) printf("%s", path);
	fflush(stdout);
status = pclose(fp);
return status;
}