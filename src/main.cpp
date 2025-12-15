#include "crow_all.h" // Busca en include/ automáticamente gracias a CMake
#include "json.hpp"
#include <iostream>

using json = nlohmann::json;

int main()
{
    crow::SimpleApp app;

    // Ruta de prueba
    CROW_ROUTE(app, "/")([](){
        return "¡Servidor de Fotos en C++ Activo!";
    });

    // Puerto 18080 para pruebas (luego usaremos el 80)
    std::cout << "Iniciando servidor en puerto 18080..." << std::endl;
    app.port(18080).multithreaded().run();
}