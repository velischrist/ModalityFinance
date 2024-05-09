-- ModalityFinance
-- Setup file for ModalityFinance MySQL database

-- DROP TABLE commands:
-- SQL script to drop tables from a MySQL database

DROP TABLE IF EXISTS report_docs;
DROP TABLE IF EXISTS financial_docs;
DROP TABLE IF EXISTS agreements;
DROP TABLE IF EXISTS investments;
DROP TABLE IF EXISTS fundraises;
DROP TABLE IF EXISTS lps;
DROP TABLE IF EXISTS funds;
DROP TABLE IF EXISTS companies;

-- SQL script to create tables for a MySQL database
-- Creating the 'Companies' table
CREATE TABLE companies (
    CompanyID INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(255) NOT NULL,
    Industry VARCHAR(100),
    Status ENUM('Open', 'Closed') NOT NULL,
    Location VARCHAR(255),
    DateCreated DATE NOT NULL
);

-- Creating the 'Funds' table
CREATE TABLE funds (
    FundID INT AUTO_INCREMENT PRIMARY KEY,
    FundName VARCHAR(255) NOT NULL,
    FundSize BIGINT,
    FundType VARCHAR(100),
    Status ENUM('Open', 'Closed') NOT NULL,
    DateCreated DATE NOT NULL,
    TargetEndDate DATE
);

-- Creating the 'LPs' table
CREATE TABLE lps (
    LPID INT AUTO_INCREMENT PRIMARY KEY,
    LPName VARCHAR(255) NOT NULL,
    Location VARCHAR(255),
    Type VARCHAR(100)
);

-- Creating the 'Fundraises' table
CREATE TABLE fundraises (
    FundraiseID INT AUTO_INCREMENT PRIMARY KEY,
    LPID INT,
    FundID INT,
    AmountInvested BIGINT,
    Date DATE NOT NULL,
    FOREIGN KEY (LPID) REFERENCES LPs(LPID),
    FOREIGN KEY (FundID) REFERENCES Funds(FundID)
);

-- Creating the 'Investments' table
CREATE TABLE investments (
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
CREATE TABLE agreements (
    AgreementID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    DocumentPath VARCHAR(255) NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

-- Creating the 'FinancialDocs' table
CREATE TABLE financial_docs (
    FinancialDocsID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    DocumentPath VARCHAR(255) NOT NULL,
    Type VARCHAR(100),
    IsProcessed BOOLEAN NOT NULL,
    Date DATE NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

-- Creating the 'ReportDocuments' table
CREATE TABLE report_docs (
    ReportDocID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DocumentPath VARCHAR(255) NOT NULL,
    Date DATE NOT NULL
);