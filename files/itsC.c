#include<stdio.h>
void selectionSort(int arr[], int n) {
int i, j, min_idx;
for (i = 0; i < n - 1; i++) {
min_idx = i;
for (j = i + 1; j < n; j++) {
if (arr[j] < arr[min_idx]) {
min_idx = j;
}
}
int temp = arr[i];
arr[i] = arr[min_idx];
arr[min_idx] = temp;
}
}
void printArray(int arr[], int n) {
int i;
for(i=0; i<n; i++) {
printf("%d  ",arr[i]);
	fflush(stdout);
}
printf("\n");
	fflush(stdout);
} 
int main() {
int n, i;
printf("Enter the size of array : ");
	fflush(stdout);
printf("-1a\n");
	fflush(stdout);
	scanf("%d",&n);
int arr[n];
for(i=0; i<n; i++) {
printf("Enter elemnet [%d] : ",i+1);
	fflush(stdout);
printf("-1a\n");
	fflush(stdout);
	scanf("%d",&arr[i]);
}
printf("Array element before sorting:- ");
	fflush(stdout);
printArray(arr, n);
selectionSort(arr, n);
printf("Array element after sorting:- ");
	fflush(stdout);
printArray(arr, n);
return 0;
}