init: user-confirmation
	cd api-gateway-service && make setup
	cd service-manager && make setup
	cd auth-service && make setup
	cd master-service && make setup
	cd transactional-service && make setup
	cd log-service && make setup
	cd swagger-peminjaman-ruang && make up
	@echo "Berhasil menginisialisasi aplikasi peminjaman-ruang!"

up: user-confirmation
	cd api-gateway-service && make up
	cd service-manager && make up
	cd auth-service && make up
	cd master-service && make up
	cd transactional-service && make up
	cd log-service && make up
	cd swagger-peminjaman-ruang && make up
	@echo "Berhasil menginisialisasi aplikasi peminjaman-ruang!"

down:
	cd master-service && make down
	cd transactional-service && make down
	cd auth-service && make down
	cd service-manager && make down
	cd log-service && make down
	cd swagger-peminjaman-ruang && make down
	cd api-gateway-service && make down
	@echo "Berhasil menutup aplikasi peminjaman-ruang!"

seed:
	@echo "Memulai seeding service manager ..."
	cd service-manager && docker exec -it service-manager-peminjaman-ruang sh -c "npx sequelize-cli db:seed:all"

	@echo "Memulai seeding auth service ..."
	cd auth-service && docker exec -it auth-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:all"

	@echo "Memulai seeding master service ..."
	cd master-service && docker exec -it master-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:all"

	@echo "Memulai seeding transactional service ..."
	cd transactional-service && docker exec -it transactional-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:all"

	@echo "Proses seeding berhasil dilakukan!"

undo-seed:
	@echo "Memulai penghapusan data service manager ..."
	cd service-manager && docker exec -it service-manager-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all"

	@echo "Memulai penghapusan data auth service ..."
	cd auth-service && docker exec -it auth-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all"

	@echo "Memulai penghapusan data master service ..."
	cd master-service && docker exec -it master-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all"

	@echo "Memulai penghapusan data transactional service ..."
	cd transactional-service && docker exec -it transactional-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all"

	@echo "Proses penghapusan data berhasil dilakukan!"

full-seed:
	@echo "Memulai seeding total service manager ..."
	cd service-manager && docker exec -it service-manager-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all; npx sequelize-cli db:seed:all"

	@echo "Memulai seeding total auth service ..."
	cd auth-service && docker exec -it auth-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all; npx sequelize-cli db:seed:all"

	@echo "Memulai seeding total master service ..."
	cd master-service && docker exec -it master-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all; npx sequelize-cli db:seed:all"

	@echo "Memulai seeding total transactional service ..."
	cd transactional-service && docker exec -it transactional-service-peminjaman-ruang sh -c "npx sequelize-cli db:seed:undo:all; npx sequelize-cli db:seed:all"

	@echo "Proses seeding total berhasil dilakukan!"

user-confirmation:
	@read -p "Pastikan .env pada tiap microservice sudah terkonfigurasi, lanjutkan? (y/n): " yn; \
	if [ "$$yn" != "y" ]; then \
		echo "Membatalkan ..."; \
		exit 1; \
	fi

down-postgres-data:
	echo "Memulai Hapus postgres data pada auth-service"
	cd auth-service && rm -rf postgres-data
	echo "Memulai Hapus postgres data pada master-service"
	cd master-service && rm -rf postgres-data
	echo "Memulai Hapus postgres data pada transactional-service"
	cd transactional-service && rm -rf postgres-data
	echo "Memulai Hapus postgres data pada service-manager"
	cd service-manager && rm -rf postgres-data
