# PEMINJAMAN RUANGAN MICROSERVICE SYSTEM

## Konfigurasi

1.  Persiapkan Docker Desktop atau dapat menggunakan WSL:Ubuntu untuk menjalankan containers/services.

2.  Copy dan paste file `.env.example` menjadi `.env` pada setiap service. Harap tidak mengganti CONTAINER_NAME bila anda tidak tahu cara menyesuaikan dengan konfigurasi yang lain (Parent Makefile).

3.  Sesuaikan environment masing-masing sesuai yang dibutuhkan.

    ```sh
    # atur nama container yang ingin dibuat
    CONTAINER_NAME=my-service

    # App Mode
    # [development, production]
    NODE_ENV=development
    # atur container akan berjalan di port berapa
    PORT=80

    # Database Config
    DB_USERNAME=my-postgres
    DB_PASSWORD=mydbpassword
    DB_DATABASE=my-postgres
    DB_PORT=5432
    # expose database port ke local
    DB_PORT_PUBLIC=5432
    ```

4.  Bila `.env` sudah selesai diatur, buka console/terminal, dan ketikkan:

    ```sh
    make init
    ```

    Perintah ini akan melakukan build and run semua service ke localhost.

5.  Untuk melakukan seeding, masuk ke direktori service yang dituju, lalu ketikkan pada terminal:

    ```sh
    make exec
    ```

    Perintah tersebut akan membuka terminal yang ada di dalam docker, dan di terminal docker tersebut ketikkan:

    ```sh
    npx sequelize-cli db:seed:all
    ```

    Bila ingin melakukan seeding secara keseluruhan, ketikkan pada terminal:

    ```sh
    # Melakukan seeding tanpa penghapusan data sebelum
    make seed

    # Melakukan penghapusan data sebelum
    make undo-seed

    # Melakukan penghapusan data sebelum lalu seeding ulang
    make full-seed
    ```
