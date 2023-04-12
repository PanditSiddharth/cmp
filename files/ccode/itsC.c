#include <iostream>
using namespace std;
int main() {
int num1, num2;
char op;
cout << "Enter first number: ";
cin >> num1;
cout << "Enter second number: ";
cin >> num2;
cout << "Enter operator (+, -, *, /): ";
cin >> op;
switch(op) {
case '+':
cout << num1 + num2;
break;
case '-':
cout << num1 - num2;
break;
case '*':
cout << num1 * num2;
break;
case '/':
if(num2 == 0) {
cout << "Error: Cannot divide by zero";
} else {
cout << num1 / num2;
}
break;
default:
cout << "Error: Invalid operator";
break;
}
return 0;
}