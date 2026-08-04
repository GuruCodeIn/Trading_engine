#include <cstdlib>
#include <iostream>

int main() {
    std::cout<<"Running Trading Engine tests...\n";

    int result = std::system("./test_order_book");

    if(result!=0){
        std::cout<<"Tests failed.\n";
        return result;
    }

    std::cout<<"All tests passed.\n";
    return 0;
}
