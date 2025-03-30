cafe-employee-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── cafeApi.js
│   │   └── employeeApi.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmationDialog.jsx
│   │   │   ├── FormTextField.jsx
│   │   │   ├── FormSelectField.jsx
│   │   │   ├── FormRadioGroup.jsx
│   │   │   ├── LoadingIndicator.jsx
│   │   │   ├── UnsavedChangesAlert.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── cafe/
│   │   │   ├── CafeTable.jsx
│   │   │   ├── CafeForm.jsx
│   │   │   └── CafeFilter.jsx
│   │   └── employee/
│   │       ├── EmployeeTable.jsx
│   │       ├── EmployeeForm.jsx
│   │       └── EmployeeFilter.jsx
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── cafe/
│   │   │   ├── CafeListPage.jsx
│   │   │   ├── AddCafePage.jsx
│   │   │   └── EditCafePage.jsx
│   │   └── employee/
│   │       ├── EmployeeListPage.jsx
│   │       ├── AddEmployeePage.jsx
│   │       └── EditEmployeePage.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── cafeSlice.js
│   │   │   └── employeeSlice.js
│   │   └── thunks/
│   │       ├── cafeThunks.js
│   │       └── employeeThunks.js
│   ├── utils/
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── errorHandler.js
│   ├── styles/
│   │   ├── theme.js
│   │   └── global.css
│   ├── App.jsx
│   ├── index.js
│   └── routes.js
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
└── README.md