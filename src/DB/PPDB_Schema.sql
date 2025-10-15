
-- ======================================================
-- DATABASE SCHEMA: Dental Clinic Management System
-- Author: Festim Beqiri
-- Date: 2025-10-15
-- ======================================================

CREATE DATABASE PP;
GO
USE PP;
GO

-- ==================== PATIENTS ====================
CREATE TABLE Patients (
    PatientID INT IDENTITY PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M','F')),
    BirthDate DATE,
    Phone NVARCHAR(20),
    Email NVARCHAR(100),
    Address NVARCHAR(255),
    City NVARCHAR(100),
    EmergencyContact NVARCHAR(100),
    EmergencyPhone NVARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);
GO

-- ==================== STAFF ====================
CREATE TABLE Staff (
    StaffID INT IDENTITY PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Role NVARCHAR(50) CHECK (Role IN ('Dentist','Assistant','Receptionist','Technician','Admin')),
    Phone NVARCHAR(20),
    Email NVARCHAR(100),
    HireDate DATE,
    Salary DECIMAL(10,2),
    IsActive BIT DEFAULT 1
);
GO

-- ==================== ROOMS ====================
CREATE TABLE Rooms (
    RoomID INT IDENTITY PRIMARY KEY,
    RoomName NVARCHAR(100),
    Type NVARCHAR(50) CHECK (Type IN ('Consultation','Surgery','X-Ray','Lab')),
    Status NVARCHAR(20) DEFAULT 'Available'
);
GO

-- ==================== APPOINTMENTS ====================
CREATE TABLE Appointments (
    AppointmentID INT IDENTITY PRIMARY KEY,
    PatientID INT NOT NULL FOREIGN KEY REFERENCES Patients(PatientID),
    StaffID INT NOT NULL FOREIGN KEY REFERENCES Staff(StaffID),
    RoomID INT FOREIGN KEY REFERENCES Rooms(RoomID),
    AppointmentDate DATETIME NOT NULL,
    Status NVARCHAR(20) CHECK (Status IN ('Scheduled','Completed','Cancelled','No-Show')),
    Notes NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- ==================== PROCEDURES ====================
CREATE TABLE Procedures (
    ProcedureID INT IDENTITY PRIMARY KEY,
    Code NVARCHAR(20) UNIQUE NOT NULL,
    Name NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX),
    StandardFee DECIMAL(10,2)
);
GO

-- ==================== TREATMENT RECORDS ====================
CREATE TABLE TreatmentRecords (
    TreatmentID INT IDENTITY PRIMARY KEY,
    AppointmentID INT FOREIGN KEY REFERENCES Appointments(AppointmentID),
    ProcedureID INT FOREIGN KEY REFERENCES Procedures(ProcedureID),
    ToothNumber NVARCHAR(10),
    Diagnosis NVARCHAR(MAX),
    Notes NVARCHAR(MAX),
    DurationMinutes INT,
    Cost DECIMAL(10,2),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- ==================== DENTAL CHARTS ====================
CREATE TABLE DentalCharts (
    ChartID INT IDENTITY PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    ToothNumber NVARCHAR(10),
    Condition NVARCHAR(100),
    Status NVARCHAR(50),
    LastUpdated DATETIME DEFAULT GETDATE()
);
GO

-- ==================== MEDICATIONS ====================
CREATE TABLE Medications (
    MedicationID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(150),
    Description NVARCHAR(MAX),
    Dosage NVARCHAR(50),
    Stock INT DEFAULT 0,
    UnitPrice DECIMAL(10,2)
);
GO

-- ==================== PRESCRIPTIONS ====================
CREATE TABLE Prescriptions (
    PrescriptionID INT IDENTITY PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    StaffID INT FOREIGN KEY REFERENCES Staff(StaffID),
    AppointmentID INT FOREIGN KEY REFERENCES Appointments(AppointmentID),
    IssueDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(MAX)
);
GO

CREATE TABLE PrescriptionDetails (
    ID INT IDENTITY PRIMARY KEY,
    PrescriptionID INT FOREIGN KEY REFERENCES Prescriptions(PrescriptionID),
    MedicationID INT FOREIGN KEY REFERENCES Medications(MedicationID),
    Dosage NVARCHAR(50),
    Frequency NVARCHAR(50),
    DurationDays INT
);
GO

-- ==================== INVOICES ====================
CREATE TABLE Invoices (
    InvoiceID INT IDENTITY PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    AppointmentID INT FOREIGN KEY REFERENCES Appointments(AppointmentID),
    TotalAmount DECIMAL(10,2),
    Discount DECIMAL(10,2) DEFAULT 0,
    InsuranceCovered DECIMAL(10,2) DEFAULT 0,
    AmountDue AS (TotalAmount - Discount - InsuranceCovered) PERSISTED,
    Status NVARCHAR(20) CHECK (Status IN ('Unpaid','Paid','Partial','Cancelled')),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Payments (
    PaymentID INT IDENTITY PRIMARY KEY,
    InvoiceID INT FOREIGN KEY REFERENCES Invoices(InvoiceID),
    PaymentDate DATETIME DEFAULT GETDATE(),
    Amount DECIMAL(10,2),
    Method NVARCHAR(50) CHECK (Method IN ('Cash','Card','Insurance','Transfer')),
    Notes NVARCHAR(255)
);
GO

-- ==================== INSURANCE ====================
CREATE TABLE InsuranceProviders (
    ProviderID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(150),
    Contact NVARCHAR(100),
    Phone NVARCHAR(20),
    Email NVARCHAR(100),
    Address NVARCHAR(255)
);
GO

CREATE TABLE InsuranceClaims (
    ClaimID INT IDENTITY PRIMARY KEY,
    InvoiceID INT FOREIGN KEY REFERENCES Invoices(InvoiceID),
    ProviderID INT FOREIGN KEY REFERENCES InsuranceProviders(ProviderID),
    ClaimDate DATETIME DEFAULT GETDATE(),
    ClaimAmount DECIMAL(10,2),
    Status NVARCHAR(20) CHECK (Status IN ('Pending','Approved','Rejected','Paid')),
    ResponseDate DATETIME,
    Notes NVARCHAR(MAX)
);
GO

-- ==================== INVENTORY ====================
CREATE TABLE Inventory (
    ItemID INT IDENTITY PRIMARY KEY,
    ItemName NVARCHAR(150),
    Category NVARCHAR(50),
    Quantity INT DEFAULT 0,
    Unit NVARCHAR(20),
    ReorderLevel INT DEFAULT 10,
    UnitPrice DECIMAL(10,2)
);
GO

CREATE TABLE InventoryTransactions (
    TransactionID INT IDENTITY PRIMARY KEY,
    ItemID INT FOREIGN KEY REFERENCES Inventory(ItemID),
    StaffID INT FOREIGN KEY REFERENCES Staff(StaffID),
    Type NVARCHAR(20) CHECK (Type IN ('Add','Remove','Adjust')),
    Quantity INT,
    TransactionDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(255)
);
GO

-- ==================== AUDIT LOGS ====================
CREATE TABLE AuditLogs (
    LogID INT IDENTITY PRIMARY KEY,
    UserID INT,
    Action NVARCHAR(100),
    TableName NVARCHAR(100),
    RecordID INT,
    ActionDate DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50)
);
GO
