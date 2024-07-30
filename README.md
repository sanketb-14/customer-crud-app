# React + Vite

# Customer Management CRUD Application

## Description
This is a React-based CRUD (Create, Read, Update, Delete) application for managing customer information. It allows users to add, edit, and delete customer records, including multiple addresses per customer. The application features real-time PAN (Permanent Account Number) verification and postcode-based city/state auto-filling.

## Features
- Add new customers with detailed information
- Edit existing customer records
- Delete customer records
- PAN verification with auto-filling of full name
- Postcode-based auto-filling of city and state
- Support for multiple addresses per customer (up to 10)
- Responsive design using Tailwind CSS
- Form validation using React Hook Form
- State management with React Query

## Technologies Used
- React
- React Router for navigation
- React Hook Form for form handling
- React Query for state management and API calls
- Tailwind CSS for styling
- Axios for API requests

## Setup and Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Start the development server ( npm run dev)

## Usage
- Navigate to the home page to view the list of customers
- Click on "Add Customer" to create a new customer record
- Click on "Edit" next to a customer to modify their information
- Click on "Delete" to remove a customer record
- When adding or editing a customer:
- Enter PAN to trigger verification
- Enter postcode to auto-fill city and state
- Add up to 10 addresses per customer

## API Integration
The application integrates with two external APIs:
1. PAN Verification API
2. Postcode Details API

Ensure these APIs are accessible and correctly configured in the `api.js` file.

## Local Storage
Customer data is stored in the browser's local storage. This means data persists across sessions but is limited to the user's browser.

## Contributing
Contributions to improve the application are welcome. Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request


## Contact
sanket barapatre
7773950615