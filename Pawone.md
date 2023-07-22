# Paw One

## Project Description

Paw One is a sophisticated veterinary data management application that follows a three-step flow to optimize and streamline the usage and accessibility of critical data across multiple veterinary hospitals. This application has been built in collaboration with the Vice President, focusing on product refinement and constant development.

The application operates in three main sections:

1. **Data Ingress**: This initial phase is responsible for the collection and processing of raw data from various veterinary hospitals. It employs efficient mechanisms for aggregating and deduplicating data, ensuring the reliability and integrity of the information to be used.

2. **Database and API Interaction**: After processing, the refined data is stored into a PostgreSQL database. SQLAlchemy, a Python SQL toolkit and Object-Relational Mapping (ORM) library, facilitates effective interaction with the database. This section also features a Laravel GraphQL API, which serves as a flexible conduit for exchanging data between the database and the frontend.

3. **Frontend Interface**: The final section is built using React, a powerful JavaScript library known for building intuitive and robust user interfaces. The frontend is designed to provide a seamless user experience, presenting the data in a comprehensive and user-friendly manner. For styling and UI enhancement, the application uses Tailwind CSS, a utility-first CSS framework known for its efficiency in building custom designs.

Overall, Paw One's aim is to enhance data efficiency, accessibility, and utility in the veterinary sector, ultimately leading to improved service delivery and patient care. The ongoing refinement and development of the product, coupled with strategic planning, underscore its adaptability and future-readiness in the ever-evolving landscape of data management.

## Tech Stack

This project uses a diverse tech stack, including:

- **Python**: For backend logic and data handling.
- **Flask**: A micro web framework written in Python, used to set up the web server.
- **SQLAlchemy**: The Python SQL toolkit and Object-Relational Mapping (ORM) library for SQL Alchemy to interact with our database.
- **PostgreSQL**: Our primary database to store de-duplicated and aggregated data.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **React**: A JavaScript library for building the user interface, particularly single page applications.
- **GraphQL**: A query language for APIs, and a runtime for executing those queries with existing data.

## Application Setup

This section will cover the steps needed to clone the project and set it up on your local machine.

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Node.js
- PostgreSQL
- Git
