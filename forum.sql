-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 24. 14:34
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `forum`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ClaimType` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `ClaimValue` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Name` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `NormalizedName` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('ec9d20d0-6409-4d4d-82f4-16bbef8a0c55', 'csoves', 'CSOVES', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ClaimType` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `ClaimValue` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ProviderKey` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ProviderDisplayName` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `UserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `RoleId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `FullName` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Birthdate` datetime(6) NOT NULL,
  `UserName` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Email` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `SecurityStamp` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `PhoneNumber` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `FullName`, `Birthdate`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('0', NULL, '0000-00-00 00:00:00.000000', 'Sigma123', 'SIGMA123', 'cuccmok@gmail.com', 'CUCCMOK@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEFHNvz2P/p8UYSjsox8R7NkxnErpcNkHnfwN2wpfMfAY+V9EvLYAwa2Y+qyToVYysA==', 'BKPV54KOF7C4W3UCUQONPG52IZXDZSD4', 'ca1907c0-c9a2-4dfc-8ca2-55ccb0d96e3f', NULL, 0, 0, NULL, 1, 0),
('81cdb6cf-e7bb-4942-ab6d-582c40f5d834', NULL, '0000-00-00 00:00:00.000000', 'jomagam', 'JOMAGAM', 'nagyg1@kkszki.hu', 'NAGYG1@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEC1YDpRpeCc5UFDOs9ooevMI7DMoiK6/+lYFSZiP9LlPC+q7vPld9IAaJENDc35ozg==', 'MS3F4QCHLK3AOAJPLLKYFGUJXSM7245K', '258d16ae-0d94-41d4-a480-fe546e37be77', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `LoginProvider` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Value` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `chat`
--

CREATE TABLE `chat` (
  `Id` int(11) NOT NULL,
  `UIds` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Texts` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `CreatedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `Id` int(11) NOT NULL,
  `UId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `TId` int(11) NOT NULL,
  `Text` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `CreatedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `topics`
--

CREATE TABLE `topics` (
  `Id` int(11) NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Description` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `CreatedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `topics`
--

INSERT INTO `topics` (`Id`, `Title`, `Description`, `UId`, `CreatedTime`) VALUES
(7, 'React', 'React témához kapcsolódó kommentek', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 11:23:19'),
(8, 'JavaScript', 'JavaScript témához kapcsolódó kommentek', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 11:23:44'),
(9, 'CSS', 'CSS témához kapcsolódó kommentek', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 11:23:56'),
(10, 'AA', 'A', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 11:31:49'),
(11, 'BB', 'dfghj', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 12:22:20'),
(12, 'CC', 'dfghjkl', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 12:32:17'),
(13, 'Ketya', 'gfdgfdgdf', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 12:33:06'),
(14, 'DD', 'dfghjk', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 14:02:25'),
(15, 'EE', 'dfghjkl', '81cdb6cf-e7bb-4942-ab6d-582c40f5d834', '2025-03-24 14:08:38');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ProductVersion` varchar(32) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250116082717_CreateAuthDb', '8.0.12');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `t_id` (`TId`),
  ADD KEY `u_id` (`UId`);

--
-- A tábla indexei `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `uid` (`UId`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `chat`
--
ALTER TABLE `chat`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `topics`
--
ALTER TABLE `topics`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`TId`) REFERENCES `topics` (`Id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UId`) REFERENCES `aspnetusers` (`Id`);

--
-- Megkötések a táblához `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`UId`) REFERENCES `aspnetusers` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
