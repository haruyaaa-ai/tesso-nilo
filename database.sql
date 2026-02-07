-- Database Export for Tesso Nilo Website
-- Generated for manual import via phpMyAdmin or MySQL CLI

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Database: `tesso_nilo_db`
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `tesso_nilo_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tesso_nilo_db`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
-- Table structure for table `berita`
-- --------------------------------------------------------

CREATE TABLE `berita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(255) DEFAULT 'assets/img/default-news.jpg',
  `category` varchar(50) NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `berita_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
-- Table structure for table `reservasi`
-- --------------------------------------------------------

CREATE TABLE `reservasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `date_booking` date NOT NULL,
  `tickets` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `payment_proof` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reservasi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
-- Table structure for table `ticket_pricing`
-- --------------------------------------------------------

CREATE TABLE `ticket_pricing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
-- Dumping data for table `users`
-- (Passwords are hashed: '12345')
-- --------------------------------------------------------

INSERT INTO `users` (`username`, `email`, `password`, `full_name`, `role`, `phone`) VALUES
('admin', 'admin@tessonilo.com', '$2y$10$fW3CqXvVv5uG6zQ9G/H7O.O994xG2V95yC3n6S7B9E1W0v5XqY.K.', 'Administrator', 'admin', '0812345678'),
('pengunjung', 'pengunjung@gmail.com', '$2y$10$fW3CqXvVv5uG6zQ9G/H7O.O994xG2V95yC3n6S7B9E1W0v5XqY.K.', 'Pengunjung Setia', 'customer', '0812987654');

-- --------------------------------------------------------
-- Dumping data for table `ticket_pricing`
-- --------------------------------------------------------

INSERT INTO `ticket_pricing` (`type`, `price`, `description`) VALUES
('Dewasa', 150000.00, 'Tiket masuk untuk wisatawan dewasa'),
('Anak-anak', 100000.00, 'Tiket masuk untuk anak-anak usia 5-12 tahun'),
('Pelajar', 125000.00, 'Tiket masuk untuk pelajar dengan kartu pelajar valid'),
('Rombongan', 125000.00, 'Tiket masuk untuk rombongan minimal 10 orang');

-- --------------------------------------------------------
-- Dumping data for table `berita`
-- --------------------------------------------------------

INSERT INTO `berita` (`title`, `content`, `category`, `date`, `created_by`) VALUES
('Laporan Konservasi Gajah', 'Populasi Gajah Sumatera terpantau stabil di zona inti. Upaya mitigasi konflik dengan masyarakat berjalan efektif.', 'Konservasi', NOW(), 1),
('Studi Keragaman Flora Hutan Rawa', 'Ditemukan dua spesies Anggrek baru di area blok selatan yang memerlukan perlindungan segera.', 'Riset', NOW(), 1),
('Pengembangan Jalur Ekowisata Sepeda', 'Pembukaan jalur baru sepanjang 15 km untuk wisata sepeda yang ramah lingkungan di zona penyangga. Tiket dapat dipesan melalui laman reservasi.', 'Ekowisata', NOW(), 1);

COMMIT;
