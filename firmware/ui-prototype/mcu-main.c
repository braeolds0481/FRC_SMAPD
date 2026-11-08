/*
    MCU code for web UI prototype, Team 23SMAPD, JSON PACKET VERSION

    To be run on the dev board, loads client-ui.html to client over
    Ethernet and then sends random I/V data and CAN JSON packets

    Created:    11.6.2026
    Modified:   11.6.2026
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 9000
#define BUFFER_SIZE 1024

// read HTML file into memory
char* read_html_file(long *length) {
    FILE *file = fopen("client-ui.html", "r");
    if (!file) {    // error checking
        perror("Failed to open HTML file");
        return NULL;
    }

    fseek(file, 0, SEEK_END);               // set up buffer for file reading?
    *length = ftell(file);
    fseek(file, 0, SEEK_SET);

    char *buffer = malloc(*length + 1);     // allocate memory for buffer
}

///////////////////
//// MAIN LOOP ////
///////////////////

