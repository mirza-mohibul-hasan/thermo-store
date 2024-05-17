-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2024 at 08:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thermostoredb`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `blockId` int(255) NOT NULL,
  `userId` int(255) DEFAULT NULL,
  `height` double NOT NULL DEFAULT 0,
  `width` double NOT NULL DEFAULT 0,
  `productId` int(255) DEFAULT NULL,
  `seasonId` int(255) DEFAULT NULL,
  `durationId` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `duration`
--

CREATE TABLE `duration` (
  `durationId` int(255) DEFAULT NULL,
  `period` varchar(255) NOT NULL,
  `weightage` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(255) DEFAULT NULL,
  `category` text NOT NULL,
  `charge` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `seasonId` int(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `weightage` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'avatar.jpg',
  `role` varchar(50) NOT NULL DEFAULT 'customer',
  `password` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `phone`, `avatar`, `role`, `password`) VALUES
(1, 'Alice Smith', 'alice@example.com', '123-456-7890', 'alice_avatar.jpg', 'customer', 'password123'),
(2, 'Bob Johnson', 'bob@example.com', '234-567-8901', 'bob_avatar.jpg', 'admin', 'password456'),
(3, 'Charlie Brown', 'charlie@example.com', '345-678-9012', 'charlie_avatar.jpg', 'customer', 'password789'),
(4, 'Daisy Miller', 'daisy@example.com', '456-789-0123', 'daisy_avatar.jpg', 'storekeeper', 'password012'),
(5, 'Evan Davis', 'evan@example.com', '567-890-1234', 'evan_avatar.jpg', 'admin', 'password345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`blockId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `blockId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
