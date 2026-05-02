-- CreateTable
CREATE TABLE `GoldPrice` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `source` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GoldPrice_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
