"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("service_paths", [
      // Service: Service Manager
      {
        id: "2a7213f9-ee0c-4124-a221-708728f6ead6",
        service_id: "4a36c2a3-1dc0-49b9-a3a5-1de5f9d758e0",
        path_name: "services",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1f064582-f1a4-41a2-a3c6-be137856b601",
        service_id: "4a36c2a3-1dc0-49b9-a3a5-1de5f9d758e0",
        path_name: "service-paths",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Service: Auth Service
      {
        id: "aeddab4b-e0e3-417f-967f-6538f524004d",
        service_id: "5ae5e6e1-12cc-4ad1-8f80-8f2742cef3f5",
        path_name: "auth",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Service: Master Service
      {
        id: "32e167d2-3c9d-4aef-a1a3-f980fecda08f",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "users",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "31dd26a1-e266-4a35-9cc3-52dd977f669d",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "roles",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a6f66d00-8ae0-4b24-a852-a546aad471d3",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "group-menus",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e64bb720-fe29-4b6d-b137-e5619c045ddb",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "menus",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7287c84a-2b2f-440e-9d9e-ff430a7fe9ed",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "user-access",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4d6f7a3e-e988-423d-81de-3b72594df272",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "user-profiles",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "68683bfd-b641-4878-a6fb-28bdc1288243",
        service_id: "8e416062-7664-481e-8858-3242107c288f",
        path_name: "rooms",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Service: Log Service
      {
        id: "714fafe4-844c-4be4-b4af-83f3d9b39a58",
        service_id: "da2f6c45-9960-49fd-b977-61b9f7f572cb",
        path_name: "logs",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //Service: Transactional Service
      {
        id: "727acedc-ba2e-4087-b8ab-6e48d7c9739b",
        service_id: "fc5f34cb-29ec-4517-81a4-e70919736ac3",
        path_name: "reservation",
        is_maintenance: false,
        is_suspend: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("service_paths", null, {});
  },
};
