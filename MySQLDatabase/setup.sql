-- ModalityFinance
-- Setup file for ModalityFinance MySQL database

-- DROP TABLE commands:
-- SQL script to drop tables from a MySQL database

DROP TABLE IF EXISTS ReportDocuments;
DROP TABLE IF EXISTS FinancialDocs;
DROP TABLE IF EXISTS Agreements;
DROP TABLE IF EXISTS Investments;
DROP TABLE IF EXISTS Fundraises;
DROP TABLE IF EXISTS LPs;
DROP TABLE IF EXISTS Funds;
DROP TABLE IF EXISTS Companies;

-- SQL script to create tables for a MySQL database
-- Creating the 'Companies' table
CREATE TABLE Companies (
    CompanyID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255) NOT NULL,
    Industry VARCHAR(100),
    Status ENUM('Open', 'Closed') NOT NULL,
    Location VARCHAR(255),
    DateCreated DATE NOT NULL
);

-- Creating the 'Funds' table
CREATE TABLE Funds (
    FundID INT AUTO_INCREMENT PRIMARY KEY,
    FundName VARCHAR(255) NOT NULL,
    FundSize BIGINT,
    FundType VARCHAR(100),
    Status ENUM('Open', 'Closed') NOT NULL,
    DateCreated DATE NOT NULL,
    TargetEndDate DATE
);

-- Creating the 'LPs' table
CREATE TABLE LPs (
    LPID INT AUTO_INCREMENT PRIMARY KEY,
    LPName VARCHAR(255) NOT NULL,
    Location VARCHAR(255),
    Type VARCHAR(100)
);

-- Creating the 'Fundraises' table
CREATE TABLE Fundraises (
    FundraiseID INT AUTO_INCREMENT PRIMARY KEY,
    LPID INT,
    FundID INT,
    AmountInvested BIGINT,
    Date DATE NOT NULL,
    FOREIGN KEY (LPID) REFERENCES LPs(LPID),
    FOREIGN KEY (FundID) REFERENCES Funds(FundID)
);

-- Creating the 'Investments' table
CREATE TABLE Investments (
    InvestmentID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    Type VARCHAR(100),
    Amount BIGINT,
    Status ENUM('Active', 'Exited', 'Written Off') NOT NULL,
    Date DATE NOT NULL,
    FundID INT,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID),
    FOREIGN KEY (FundID) REFERENCES Funds(FundID)
);

-- Creating the 'Agreements' table
CREATE TABLE Agreements (
    AgreementID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    DocumentPath VARCHAR(255) NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

-- Creating the 'FinancialDocs' table
CREATE TABLE FinancialDocs (
    FinancialDocsID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    DocumentPath VARCHAR(255) NOT NULL,
    Type VARCHAR(100),
    IsProcessed BOOLEAN NOT NULL,
    Date DATE NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

-- Creating the 'ReportDocuments' table
CREATE TABLE ReportDocuments (
    ReportDocID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DocumentPath VARCHAR(255) NOT NULL,
    Date DATE NOT NULL
);