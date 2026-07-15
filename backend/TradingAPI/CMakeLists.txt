cmake_minimum_required(VERSION 3.10)
project(TradingAPI CXX)

include(CheckIncludeFileCXX)

check_include_file_cxx(any HAS_ANY)
check_include_file_cxx(string_view HAS_STRING_VIEW)
check_include_file_cxx(coroutine HAS_COROUTINE)

if (NOT "${CMAKE_CXX_STANDARD}" STREQUAL "")
    # Do nothing
elseif (HAS_ANY AND HAS_STRING_VIEW AND HAS_COROUTINE)
    set(CMAKE_CXX_STANDARD 20)
elseif (HAS_ANY AND HAS_STRING_VIEW)
    set(CMAKE_CXX_STANDARD 17)
else ()
    set(CMAKE_CXX_STANDARD 14)
endif ()

set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# -----------------------------
# Drogon
# -----------------------------
find_package(Drogon CONFIG REQUIRED)

# -----------------------------
# Trading Engine Library
# -----------------------------
set(TRADING_ENGINE_ROOT ${CMAKE_SOURCE_DIR}/../..)

target_include_directories(${PROJECT_NAME} PRIVATE
    ${TRADING_ENGINE_ROOT}/include
)

link_directories(
    ${TRADING_ENGINE_ROOT}/build
)

# -----------------------------
# Executable
# -----------------------------
add_executable(${PROJECT_NAME}
    main.cc
)

target_link_libraries(${PROJECT_NAME}
    PRIVATE
    Drogon::Drogon
    TradingEngine
)

# -----------------------------
# Drogon Controllers
# -----------------------------
aux_source_directory(controllers CTL_SRC)
aux_source_directory(filters FILTER_SRC)
aux_source_directory(plugins PLUGIN_SRC)
aux_source_directory(models MODEL_SRC)

drogon_create_views(
    ${PROJECT_NAME}
    ${CMAKE_CURRENT_SOURCE_DIR}/views
    ${CMAKE_CURRENT_BINARY_DIR}
)

target_include_directories(${PROJECT_NAME}
    PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/models
)

target_sources(${PROJECT_NAME}
    PRIVATE
    ${CTL_SRC}
    ${FILTER_SRC}
    ${PLUGIN_SRC}
    ${MODEL_SRC}
)

add_subdirectory(test)