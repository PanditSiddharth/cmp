// For checking vowels and Consonent 

#include <stdio.h>

int main() {
    char alph;
    int alphh;
    
    printf("Enter any character: ");
  fflush(stdout);
    scanf("%c", &alph);
  // fflush(stdout);
  

      // printf("Enter any character2: ");
  // fflush(stdout);
    printf("Enter any character: %c\n", alph);
  fflush(stdout);
    scanf("%d", &alphh);
  
  
    
    char vowel[] = {'a', 'e', 'i', 'o', 'u','A', 'E', 'I','O','U'};
    
    for(int i = 0; i<5; i++){
    if(alph == vowel[i] || alph == vowel[i+5] ){
    printf("This is a vowel"); 
    return 0;
    }
    }
    
    printf("This is a Consonent");
    
    return 0;
} // @C_code5