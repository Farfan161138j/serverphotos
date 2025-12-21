#include "crow_all.h"
#include "json.hpp"
#include <filesystem>
#include <iostream>
#include <fstream>

namespace fs = std::filesystem;
using json = nlohmann::json;

int main()
{
    crow::SimpleApp app;

    // CONFIGURATION: Storage path
    const std::string UPLOAD_DIR = "saved_photos";

    // Create directory if it doesn't exist
    if (!fs::exists(UPLOAD_DIR)) {
        fs::create_directory(UPLOAD_DIR);
        std::cout << "[INIT] Created directory: " << UPLOAD_DIR << std::endl;
    }

    // --- ROUTE 1: SERVE FRONTEND (HTML) ---
    CROW_ROUTE(app, "/")([](const crow::request&, crow::response& res){
        res.set_static_file_info("static/index.html");
        res.end();
    });

    // --- ROUTE 2: SERVE STATIC ASSETS (CSS/JS) ---
    CROW_ROUTE(app, "/<string>")
    ([](const crow::request&, crow::response& res, std::string filename){
        // Basic security check
        if (filename.find("..") != std::string::npos) {
            res.code = 403;
            res.end();
            return;
        }
        res.set_static_file_info("static/" + filename);
        res.end();
    });

   // --- ROUTE 3: API UPLOAD (BACKEND) ---
    CROW_ROUTE(app, "/api/upload").methods(crow::HTTPMethod::POST)
    ([&UPLOAD_DIR](const crow::request& req){
        
        crow::multipart::message msg(req);
        int saved_count = 0;
        
        for (const auto& part : msg.parts) {
            auto header = part.get_header_object("Content-Disposition");
            auto it = header.params.find("filename");

            if (it == header.params.end()) continue;

            std::string filename = it->second;
            if (filename.empty()) continue;

            fs::path destination = fs::path(UPLOAD_DIR) / filename;
            std::ofstream out_file(destination, std::ios::binary);
            out_file << part.body;
            out_file.close();

            std::cout << "[INFO] Saved: " << filename << std::endl;
            saved_count++;
        }

        json response_json;
        response_json["status"] = "ok";
        response_json["message"] = "Successfully saved " + std::to_string(saved_count) + " files.";
        
        return crow::response(response_json.dump());
    });

    // --- ESTO ES LO QUE TE FALTABA: EL ARRANQUE DEL SERVIDOR ---
    std::cout << "1. Configuración cargada. Iniciando servidor..." << std::endl;

    try {
        // Intentamos arrancar en el puerto 8080
        app.port(8080).multithreaded().run();
    } catch (const std::exception& e) {
        std::cerr << "🔴 ERROR CRITICO: " << e.what() << std::endl;
    }

    return 0;
}