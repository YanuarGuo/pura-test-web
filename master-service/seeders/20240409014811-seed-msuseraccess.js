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
    await queryInterface.bulkInsert(
      "UserAccesses",
      [
        {
          id: "6797abe0-913b-4c21-a9d0-2dbfbc9385cc",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "be228fc6-1c75-4b99-81b4-bd19d80c722e", // Menu: Services
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "16dda839-9e3f-4082-b01e-6efb5bfee36c",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "71ca7f95-996a-4d1b-863f-d39b10c5e755", // Menu: Service-Paths
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "f22b8cae-29ad-4d44-a2fe-edb72955ac04",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "f1811083-63df-4f12-a6dc-fec471cfc6cf", // Menu: Role
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "2cc2c47a-ac19-4d2c-bd53-920f8a9510d2",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "09656c5b-511f-4262-9a03-27c8248d28c7", // Menu: Group-Menu
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "f08eb379-b0ad-4ad8-8fb7-c936a66ee8b8",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "a6f71f61-19f1-419d-b015-93c71dbc912e", // Menu: Menu
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "563f4577-7218-4023-805a-24539cfb96a9",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "907836a7-1677-43ee-a9ca-54d2047a2e0d", // Menu: Role-Menu
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "3b759fd2-6ebd-40a7-9134-169a55b35c22",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "d021dc5b-e07e-4177-ab37-33cda489a5c3", // Menu: User-Access
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "83617368-901a-4a8b-a1df-e9a36dc76fec",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "fa7fbc75-0fcb-4880-9879-96b627fcc6ca", // Menu: User-Profile
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "36e4b9ec-9100-4849-a86a-dc92e47ad850",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "4785f293-6ab4-419e-84a2-69d0ce3454fd", // Menu: Users
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "6fa513e0-1418-4bc3-bc7e-e542616361b4",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "ab330151-5224-4ccd-8038-2310e86e1fb7", // Menu: Lihat Log
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "30b6c97f-84a3-4f5a-9f17-e0ca7a5811eb",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "3e8d5b51-b665-4a38-9bdd-da815f5761a0", // Menu: Reservation
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "b911646f-013c-4fb3-98d6-44d9dd0fc8ed",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434", // User: admin
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Role: Admin
          menu_id: "dd5de29b-00e0-437f-b78b-57ce779f6599", // Menu: Rooms
          is_create: true,
          is_read: true,
          is_read_all: true,
          is_update: true,
          is_delete: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserAccesses", null, {});
  },
};
