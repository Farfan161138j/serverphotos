cmake_minimum_required(VERSION 3.10)
project(ServidorFotos)

# Usar C++17 (Crow lo necesita)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Decirle dónde están los .h (tu carpeta include)
include_directories(include)

# Buscar librerías del sistema (Hilos y SQLite)
find_package(Threads REQUIRED)

# Crear el ejecutable usando tu main.cpp
add_executable(servidor_fotos src/main.cpp)

# Ligar las librerías necesarias
target_link_libraries(servidor_fotos Threads::Threads sqlite3)
