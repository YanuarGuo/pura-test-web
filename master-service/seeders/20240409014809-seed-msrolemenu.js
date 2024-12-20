"use strict";

const { v4: uuidv4 } = require("uuid");

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
      "MsRoleMenus",
      [
        // Menu: Services
        {
          id: "422c565d-e3ab-48ed-b6a7-e1d2ecba2dc9",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "be228fc6-1c75-4b99-81b4-bd19d80c722e", // Menu: Services
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "acd42753-9dcb-4018-bba8-2b8abde88c2e",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "71ca7f95-996a-4d1b-863f-d39b10c5e755", // Service Paths
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "164e01d0-c087-4083-8150-cdc54d7350f7",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "f1811083-63df-4f12-a6dc-fec471cfc6cf", // Role
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "58bb1f0f-5968-4bc2-ba62-165573bae4b4",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "09656c5b-511f-4262-9a03-27c8248d28c7", // Group Menu
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "dae338bf-cf75-4008-88b3-6bfb28adfac6",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "a6f71f61-19f1-419d-b015-93c71dbc912e", // Menu
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "a2b3dd44-043e-45f6-a519-618398895766",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "907836a7-1677-43ee-a9ca-54d2047a2e0d", // Role Menu
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "db087c0b-d354-474a-adf6-f7b7105a32ee",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "dd5de29b-00e0-437f-b78b-57ce779f6599", // Jenis Tiket
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "4874d619-085c-444a-9e23-cefcc09b328c",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "d021dc5b-e07e-4177-ab37-33cda489a5c3", // User Access
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.511Z",
          updatedAt: "2024-08-22T03:05:12.511Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "b4bc102e-1e1c-4f6b-a44a-887cce6e54e3",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "fa7fbc75-0fcb-4880-9879-96b627fcc6ca", // User Profile
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:14.317Z",
          updatedAt: "2024-08-22T03:05:14.317Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "e685d4ff-92a4-4238-aacb-ee5fd9380293",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "6e2d7329-0d1c-44df-bff1-27a45be83c6c", // Storage
          is_create: true,
          is_read: true,
          is_update: true,
          is_delete: true,
          createdAt: "2024-08-22T03:05:12.867Z",
          updatedAt: "2024-08-22T03:05:12.867Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "d7371d59-bd03-49b2-a142-5140304817d7",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "ab330151-5224-4ccd-8038-2310e86e1fb7", // Lihat Log
          is_create: false,
          is_read: true,
          is_update: false,
          is_delete: false,
          createdAt: "2024-08-22T03:05:14.366Z",
          updatedAt: "2024-08-22T03:05:14.366Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "501e398a-4f8a-4d1f-a236-fd0b1aa8880c",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "3e8d5b51-b665-4a38-9bdd-da815f5761a0", // Event
          is_create: false,
          is_read: true,
          is_update: false,
          is_delete: false,
          createdAt: "2024-08-22T03:05:14.366Z",
          updatedAt: "2024-08-22T03:05:14.366Z",
          is_read_all: true,
          createdBy: "Seeder",
          updatedBy: "Seeder",
        },
        {
          id: "9a377c7a-5d0b-4ad3-bf21-4d8a1c748999",
          role_id: "2d4970a9-7c30-428f-b339-eea6c34863a5", // Admin
          menu_id: "b014ff25-356e-4b57-9a8f-7a239166d9e1", // Ticket
          is_create: false,
          is_read: true,
          is_update: false,
          is_delete: false,
          createdAt: "2024-08-22T03:05:14.366Z",
          updatedAt: "2024-08-22T03:05:14.366Z",
          is_read_all: true,
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
    await queryInterface.bulkDelete("MsRoleMenus", null, {});
  },
};
