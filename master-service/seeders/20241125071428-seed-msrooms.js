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

    await queryInterface.bulkInsert("MsRooms", [
      {
        id: "c1b5bd9e-d56b-4f75-b934-87f17616cc09",
        room_name: "Mawar",
        location: "Lantai 1",
        capacity: 20,
        description: "Ruang VIP1",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "dee89d70-2d21-4efe-a383-7c0b59c94528",
        room_name: "Melati",
        location: "Lantai 1",
        capacity: 30,
        description: "Ruang VIP1",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "86a4c448-298d-45e9-8e4f-293ace6d4839",
        room_name: "Anggrek",
        location: "Lantai 2",
        capacity: 15,
        description: "Ruang VIP3",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "7f6a3c6f-c95b-4e23-b688-bbf67e3cdd9a",
        room_name: "Tulip",
        location: "Lantai 3",
        capacity: 25,
        description: "Ruang VIP2",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "8c9d50a1-4d97-4b22-a5f2-8cb35fcae23f",
        room_name: "Lavender",
        location: "Lantai 2",
        capacity: 18,
        description: "Ruang VIP3",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "02ab3d3a-93cf-4f0d-bbd5-3f4d6a8a7b54",
        room_name: "Kamboja",
        location: "Lantai 1",
        capacity: 40,
        description: "Ruang VIP4",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "3d924e37-c1d4-4e88-9fb1-6882c2a334c1",
        room_name: "Sakura",
        location: "Lantai 3",
        capacity: 10,
        description: "Ruang VIP5",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "c8e2f1b2-4d54-482a-aab1-d09e98a5e9b1",
        room_name: "Teratai",
        location: "Lantai 2",
        capacity: 35,
        description: "Ruang VIP6",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "4b762c71-0d56-4a5f-a479-3c82b7b4c11d",
        room_name: "Dahlia",
        location: "Lantai 1",
        capacity: 20,
        description: "Ruang VIP2",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "e3db317d-5a1c-4935-9a89-5e2b69df12e8",
        room_name: "Anyelir",
        location: "Lantai 3",
        capacity: 28,
        description: "Ruang VIP3",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "97f76445-5f22-41da-b6a5-df3b07cb72f4",
        room_name: "Flamboyan",
        location: "Lantai 1",
        capacity: 50,
        description: "Ruang VIP4",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "a0f2445c-8276-4e02-819d-d5a5e8a2c317",
        room_name: "Lili",
        location: "Lantai 2",
        capacity: 12,
        description: "Ruang VIP5",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "b5e24d87-8d63-405f-b8a4-f2d07e63c4a3",
        room_name: "Kenanga",
        location: "Lantai 1",
        capacity: 22,
        description: "Ruang VIP1",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "54d9bb71-0a41-4cfb-a112-d7c85b5fae43",
        room_name: "Edelweiss",
        location: "Lantai 2",
        capacity: 18,
        description: "Ruang VIP2",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "69b2db97-2f1a-452e-9285-9f9fa8b2c6a5",
        room_name: "Hibiscus",
        location: "Lantai 3",
        capacity: 25,
        description: "Ruang VIP3",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "99a72b3d-822b-4dd2-99f1-68d856d9b641",
        room_name: "Bougenville",
        location: "Lantai 1",
        capacity: 30,
        description: "Ruang VIP4",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
      {
        id: "c5b12b9f-2b43-45b3-962f-4e8fd17dc943",
        room_name: "Amarilis",
        location: "Lantai 2",
        capacity: 20,
        description: "Ruang VIP5",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
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
  },
};
