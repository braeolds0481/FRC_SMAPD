#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <time.h>

#define PORT 8080
#define BUFFER_SIZE 8192

void handle_client(int client_socket);
void serve_file(int client_socket, const char *filename, const char *content_type);
void handle_sse(int client_socket);
void handle_post(int client_socket, char *body);

int main() {
    int server_fd, client_socket;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);

    // Create socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket failed");
        exit(EXIT_FAILURE);
    }

    // Attach socket to port 8080
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt))) {
        perror("Setsockopt failed");
        exit(EXIT_FAILURE);
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }

    printf("=========================================\n");
    printf("SMAPD C Server running at http://localhost:%d/\n", PORT);
    printf("=========================================\n");

    srand(time(NULL));

    while (1) {
        if ((client_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen)) < 0) {
            perror("Accept failed");
            continue;
        }
        handle_client(client_socket);
    }

    return 0;
}

void handle_client(int client_socket) {
    char buffer[BUFFER_SIZE] = {0};
    ssize_t bytes_read = read(client_socket, buffer, BUFFER_SIZE - 1);
    if (bytes_read <= 0) {
        close(client_socket);
        return;
    }

    // Route requests
    if (strncmp(buffer, "GET / ", 6) == 0 || strncmp(buffer, "GET /client-ui.html", 19) == 0) {
        serve_file(client_socket, "client-ui.html", "text/html");
    } else if (strncmp(buffer, "GET /console.js", 15) == 0) {
        serve_file(client_socket, "console.js", "application/javascript");
    } else if (strncmp(buffer, "GET /port-functions.js", 22) == 0) {
        serve_file(client_socket, "port-functions.js", "application/javascript");
    } else if (strncmp(buffer, "GET /scripts.js", 15) == 0) {
        serve_file(client_socket, "scripts.js", "application/javascript");
    } else if (strncmp(buffer, "GET /events", 11) == 0) {
        handle_sse(client_socket); // Transition to 100ms SSE stream
    } else if (strncmp(buffer, "POST /command", 13) == 0) {
        char *body = strstr(buffer, "\r\n\r\n");
        if (body) {
            body += 4;
            handle_post(client_socket, body);
        } else {
            const char *resp = "HTTP/1.1 400 Bad Request\r\n\r\n";
            write(client_socket, resp, strlen(resp));
            close(client_socket);
        }
    } else {
        const char *resp = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found";
        write(client_socket, resp, strlen(resp));
        close(client_socket);
    }
}

void serve_file(int client_socket, const char *filename, const char *content_type) {
    FILE *f = fopen(filename, "r");
    if (!f) {
        const char *resp = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nFile not found";
        write(client_socket, resp, strlen(resp));
        close(client_socket);
        return;
    }

    fseek(f, 0, SEEK_END);
    long fsize = ftell(f);
    fseek(f, 0, SEEK_SET);

    char *file_buf = malloc(fsize + 1);
    fread(file_buf, 1, fsize, f);
    fclose(f);
    file_buf[fsize] = '\0';

    char header[BUFFER_SIZE];
    snprintf(header, sizeof(header), 
             "HTTP/1.1 200 OK\r\nContent-Type: %s\r\nContent-Length: %ld\r\nConnection: close\r\n\r\n", 
             content_type, fsize);

    write(client_socket, header, strlen(header));
    write(client_socket, file_buf, fsize);

    free(file_buf);
    close(client_socket);
}

// SSE endpoint sending packets every 100ms
void handle_sse(int client_socket) {
    const char *header = 
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/event-stream\r\n"
        "Cache-Control: no-cache\r\n"
        "Connection: keep-alive\r\n\r\n";
    
    if (write(client_socket, header, strlen(header)) < 0) {
        close(client_socket);
        return;
    }

    int port_counter = 1;
    while (1) {
        char data[256];
        float mock_voltage = 11.5f + ((float)(rand() % 100) / 50.0f);
        float mock_current = 1.0f + ((float)(rand() % 100) / 100.0f);

        // Send JSON packet over SSE
        snprintf(data, sizeof(data), "data: {\"port\": %d, \"voltage\": %.2f, \"current\": %.2f}\n\n", 
                 port_counter, mock_voltage, mock_current);
        
        if (write(client_socket, data, strlen(data)) < 0) {
            break; // Client disconnected
        }

        port_counter++;
        if (port_counter > 22) port_counter = 1;

        usleep(100000); // 100,000 microseconds = 100 ms
    }

    close(client_socket);
}

// Handles incoming client commands/packets and prints them to console
void handle_post(int client_socket, char *body) {
    printf("[CONSOLE COMMAND FROM CLIENT] %s\n", body);

    const char *resp = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nConnection: close\r\n\r\n{\"status\":\"received\"}";
    write(client_socket, resp, strlen(resp));
    close(client_socket);
}