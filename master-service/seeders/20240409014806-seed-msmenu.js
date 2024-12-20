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
      "MsMenus",
      [
        // Service Manager
        {
          id: "be228fc6-1c75-4b99-81b4-bd19d80c722e",
          group_menu_id: "246090da-d320-407d-b3b2-a582f0183bee",
          name: "Services",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu Services",
          service_path_id: "2a7213f9-ee0c-4124-a221-708728f6ead6",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: false,
        },
        {
          id: "71ca7f95-996a-4d1b-863f-d39b10c5e755",
          group_menu_id: "246090da-d320-407d-b3b2-a582f0183bee",
          name: "Service Paths",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu Service-Paths",
          service_path_id: "1f064582-f1a4-41a2-a3c6-be137856b601",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: false,
        },

        // Master Service
        {
          id: "f1811083-63df-4f12-a6dc-fec471cfc6cf",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Role",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu Role",
          service_path_id: "31dd26a1-e266-4a35-9cc3-52dd977f669d",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: true,
        },
        {
          id: "09656c5b-511f-4262-9a03-27c8248d28c7",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Group Menu",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu Group-Menu",
          service_path_id: "a6f66d00-8ae0-4b24-a852-a546aad471d3",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: false,
        },
        {
          id: "a6f71f61-19f1-419d-b015-93c71dbc912e",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Menu",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu",
          service_path_id: "e64bb720-fe29-4b6d-b137-e5619c045ddb",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: false,
        },
        {
          id: "907836a7-1677-43ee-a9ca-54d2047a2e0d",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Role Menu",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu Role-Menu",
          service_path_id: "dc1e85ea-3ed7-445f-8b8d-29a08be277cd",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: true,
        },
        {
          id: "d021dc5b-e07e-4177-ab37-33cda489a5c3",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "User Access",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Menu User Access",
          service_path_id: "7287c84a-2b2f-440e-9d9e-ff430a7fe9ed",
          createdAt: "2024-08-22T03:05:12.467Z",
          updatedAt: "2024-08-22T03:05:12.467Z",
          is_show: true,
        },
        {
          id: "fa7fbc75-0fcb-4880-9879-96b627fcc6ca",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Users",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Users",
          service_path_id: "32e167d2-3c9d-4aef-a1a3-f980fecda08f",
          createdAt: "2024-08-22T03:05:14.309Z",
          updatedAt: "2024-08-22T03:05:14.309Z",
          is_show: true,
        },
        {
          id: "dd5de29b-00e0-437f-b78b-57ce779f6599",
          group_menu_id: "dc748705-1485-4f0e-810b-441a16b9d555",
          name: "Rooms",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Rooms",
          service_path_id: "68683bfd-b641-4878-a6fb-28bdc1288243",
          createdAt: "2024-08-22T03:05:14.309Z",
          updatedAt: "2024-08-22T03:05:14.309Z",
          is_show: true,
        },

        // Storage Service
        {
          id: "6e2d7329-0d1c-44df-bff1-27a45be83c6c",
          group_menu_id: "3b2d91af-e322-4f2c-8a2e-6cff6464aa7e",
          name: "Storage",
          icon_local: null,
          icon_url: null,
          note: "Keterangan Storage Services",
          service_path_id: "71243676-1009-408f-b3cd-338ce1940d0c",
          createdAt: "2024-08-22T03:05:12.860Z",
          updatedAt: "2024-08-22T03:05:12.860Z",
          is_show: false,
        },

        // Log Service
        {
          id: "ab330151-5224-4ccd-8038-2310e86e1fb7",
          group_menu_id: "81aa4c01-70b1-43a0-a620-52f63a0c4190",
          name: "Lihat Log",
          icon_local: null,
          icon_url: null,
          note: "Keterangan log",
          service_path_id: "714fafe4-844c-4be4-b4af-83f3d9b39a58",
          createdAt: "2024-08-22T03:05:14.361Z",
          updatedAt: "2024-08-22T03:05:14.361Z",
          is_show: true,
        },

        // Transactional Service
        {
          id: "3e8d5b51-b665-4a38-9bdd-da815f5761a0",
          group_menu_id: "ce46b076-595e-4294-bf38-25e905db2e71",
          name: "Reservation",
          icon_local: null,
          icon_url: null,
          note: "Menu Reservation",
          service_path_id: "727acedc-ba2e-4087-b8ab-6e48d7c9739b",
          createdAt: "2024-08-22T03:05:14.361Z",
          updatedAt: "2024-08-22T03:05:14.361Z",
          is_show: true,
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
    await queryInterface.bulkDelete("MsMenus", null, {});
  },
};
