/*
  Warnings:

  - You are about to drop the `goldprice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `goldprice`;

-- CreateTable
CREATE TABLE `Gold_Price` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `source` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Gold_Price_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
