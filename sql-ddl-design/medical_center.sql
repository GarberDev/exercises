DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center


CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  specialty VARCHAR(100) NOT NULL
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  dob DATE NOT NULL
);

CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  visit_date DATE NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE patient_doctor (
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  PRIMARY KEY (patient_id, doctor_id),
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE visit_disease (
  visit_id INT NOT NULL,
  disease_id INT NOT NULL,
  PRIMARY KEY (visit_id, disease_id),
  FOREIGN KEY (visit_id) REFERENCES visits(id),
  FOREIGN KEY (disease_id) REFERENCES diseases(id)
);

-- Insert doctors
INSERT INTO doctors (first_name, last_name, specialty) VALUES ('John', 'Doe', 'Cardiology');
INSERT INTO doctors (first_name, last_name, specialty) VALUES ('Jane', 'Smith', 'Neurology');

-- Insert patients
INSERT INTO patients (first_name, last_name, dob) VALUES ('Alice', 'Johnson', '1995-03-15');
INSERT INTO patients (first_name, last_name, dob) VALUES ('Bob', 'Williams', '1980-07-25');

-- Insert diseases
INSERT INTO diseases (name, description) VALUES ('Hypertension', 'High blood pressure');
INSERT INTO diseases (name, description) VALUES ('Diabetes', 'A group of metabolic disorders characterized by high blood sugar levels over a prolonged period');

-- Insert visits
INSERT INTO visits (patient_id, doctor_id, visit_date) VALUES (1, 1, '2023-04-01');
INSERT INTO visits (patient_id, doctor_id, visit_date) VALUES (2, 2, '2023-04-02');

-- Insert patient_doctor relationship
INSERT INTO patient_doctor (patient_id, doctor_id) VALUES (1, 1);
INSERT INTO patient_doctor (patient_id, doctor_id) VALUES (2, 2);

-- Insert visit_disease relationship
INSERT INTO visit_disease (visit_id, disease_id) VALUES (1, 1);
INSERT INTO visit_disease (visit_id, disease_id) VALUES (2, 2);
