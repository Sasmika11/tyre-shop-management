-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2026 at 08:04 AM
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
-- Database: `tyre_shop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_code` varchar(20) NOT NULL,
  `supplier_name` varchar(150) NOT NULL,
  `short_name` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `phone_1` varchar(20) DEFAULT NULL,
  `phone_2` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(150) DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT 'Sri Lanka',
  `tax_no` varchar(50) DEFAULT NULL,
  `credit_limit` decimal(15,2) DEFAULT 0.00,
  `payment_term` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_code`, `supplier_name`, `short_name`, `category`, `contact_person`, `designation`, `phone_1`, `phone_2`, `email`, `website`, `logo_path`, `address`, `city`, `district`, `postal_code`, `country`, `tax_no`, `credit_limit`, `payment_term`, `is_active`, `created_at`, `updated_at`) VALUES
(13, 'SUP001', 'Global Tyre Importers (Pvt) Ltd', 'Global Tyre', 'Tyre &amp;amp;amp;amp; Accessories', 'Anura Perera', 'Sales Manager', '+94 11 234 5678', '+94 77 345 6789', 'info@globaltyr', 'www.globaltyres.lk', NULL, '450, High Level Road', 'Nugegoda', 'Colombo', '10250', 'Sri Lanka', 'V1234567897', 500000.00, 30, 1, '2026-11-11 16:32:12', '2026-11-12 05:35:33'),
(14, 'SUP002', 'Lanka Auto Spares &amp; Distributors', 'Lanka Spares', 'Spare Parts', 'Samantha Silva', 'Director Operations', '+94 11 555 8901', '+94 11 555 8905', 'sales@lankaspares.lk', 'www.lankaspares.lk', NULL, '128, Main Street', 'Colombo 11', 'Colombo', '00100', 'Sri Lanka', 'V9876543210', 750000.00, 45, 1, '2026-11-11 16:34:52', '2026-11-11 16:34:52');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_bank_details`
--

CREATE TABLE `supplier_bank_details` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `account_holder` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_categories`
--

CREATE TABLE `supplier_categories` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_contacts`
--

CREATE TABLE `supplier_contacts` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_contacts`
--

INSERT INTO `supplier_contacts` (`id`, `supplier_id`, `contact_person`, `designation`, `phone`, `email`, `is_default`, `created_at`) VALUES
(6, 13, 'Anura Perera', 'Sales Manager', '+94 11 234 5678', 'info@globaltyres.lk', 1, '2026-11-11 16:32:59');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_documents`
--

CREATE TABLE `supplier_documents` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `document_name` varchar(150) NOT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_remarks`
--

CREATE TABLE `supplier_remarks` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `remark` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `supplier_code` (`supplier_code`);

--
-- Indexes for table `supplier_bank_details`
--
ALTER TABLE `supplier_bank_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplier_contacts`
--
ALTER TABLE `supplier_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplier_documents`
--
ALTER TABLE `supplier_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplier_remarks`
--
ALTER TABLE `supplier_remarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `supplier_bank_details`
--
ALTER TABLE `supplier_bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplier_contacts`
--
ALTER TABLE `supplier_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supplier_documents`
--
ALTER TABLE `supplier_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier_remarks`
--
ALTER TABLE `supplier_remarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `supplier_bank_details`
--
ALTER TABLE `supplier_bank_details`
  ADD CONSTRAINT `supplier_bank_details_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  ADD CONSTRAINT `supplier_categories_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_contacts`
--
ALTER TABLE `supplier_contacts`
  ADD CONSTRAINT `supplier_contacts_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_documents`
--
ALTER TABLE `supplier_documents`
  ADD CONSTRAINT `supplier_documents_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_remarks`
--
ALTER TABLE `supplier_remarks`
  ADD CONSTRAINT `supplier_remarks_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
