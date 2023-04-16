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
// LinkList, insertion and show method
typedef struct node {
int data;
struct node *next;
} nde;
nde *head = 0;
nde *last = 0;
nde insert(int data){
nde *newNode = (nde *) malloc(sizeof(nde *));
newNode->next = 0;
newNode->data = data;
if(head == 0){
head = last = newNode;
} else {
last->next = newNode;
last = newNode;
}
}
void printk(){
nde * iter =head;
while(iter != 0){
printt("%d ", iter->data);
iter = iter->next;
}
}
int main(){
int data;
printt("Singly LinkedList:\n\nEnter node data: ");
scann("%d", &data);
insert(data);
printt("inserted %d\n", last->data);
printt("\nEnter node data: ");
scann("%d", &data);
insert(data);
printt("inserted %d\n", last->data);
printt("\nEnter node data: ");
scann("%d", &data);
insert(data);
printt("inserted %d", last->data);
printt("\n\nAll inserted data: ");
printk();
return 0;
} // @C_code5 
// Singly LinkedList 👈👈👺